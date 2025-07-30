// Configuration
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isDevelopment ? 'http://localhost:3000/api' : '/api';
const MAX_CHARACTERS = 280;

// DOM Elements
let postForm, contentInput, authorInput, characterCount, postsContainer;
let loadingState, emptyState, alertContainer, totalPostsElement, lastUpdateElement;

// Application State
let posts = [];
let isLoading = false;

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('🚀 Inicializando Micro-Blog ESPE...');
    
    // Get DOM elements
    getDOMElements();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadPosts();
    
    // Check system health
    checkSystemHealth();
    
    console.log('✅ Aplicación inicializada correctamente');
}

/**
 * Get references to DOM elements
 */
function getDOMElements() {
    postForm = document.getElementById('postForm');
    contentInput = document.getElementById('contentInput');
    authorInput = document.getElementById('authorInput');
    characterCount = document.getElementById('characterCount');
    postsContainer = document.getElementById('postsContainer');
    loadingState = document.getElementById('loadingState');
    emptyState = document.getElementById('emptyState');
    alertContainer = document.getElementById('alertContainer');
    totalPostsElement = document.getElementById('totalPosts');
    lastUpdateElement = document.getElementById('lastUpdate');
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Form submission
    postForm.addEventListener('submit', handlePostSubmission);
    
    // Character counter
    contentInput.addEventListener('input', updateCharacterCount);
    
    // Auto-resize textarea
    contentInput.addEventListener('input', autoResizeTextarea);
    
    // Keyboard shortcuts
    contentInput.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * Handle post form submission
 */
async function handlePostSubmission(event) {
    event.preventDefault();
    
    if (isLoading) return;
    
    const content = contentInput.value.trim();
    const author = authorInput.value.trim();
    
    // Validation
    if (!validatePost(content)) return;
    
    try {
        setLoading(true);
        await createPost(content, author);
        clearForm();
        showAlert('¡Mensaje publicado exitosamente!', 'success');
        await loadPosts();
    } catch (error) {
        console.error('Error creating post:', error);
        showAlert('Error al publicar el mensaje. Inténtalo de nuevo.', 'danger');
    } finally {
        setLoading(false);
    }
}

/**
 * Validate post content
 */
function validatePost(content) {
    if (!content) {
        showAlert('El mensaje no puede estar vacío.', 'warning');
        contentInput.focus();
        return false;
    }
    
    if (content.length > MAX_CHARACTERS) {
        showAlert(`El mensaje no puede exceder ${MAX_CHARACTERS} caracteres.`, 'warning');
        contentInput.focus();
        return false;
    }
    
    return true;
}

/**
 * Create a new post
 */
async function createPost(content, author) {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: content,
            author: author || undefined
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear el post');
    }
    
    return await response.json();
}

/**
 * Load posts from API
 */
async function loadPosts() {
    try {
        showLoadingState();
        
        const response = await fetch(`${API_BASE_URL}/posts`);
        
        if (!response.ok) {
            throw new Error('Error al cargar los posts');
        }
        
        const data = await response.json();
        posts = data.data || [];
        
        renderPosts();
        updateStats();
        
    } catch (error) {
        console.error('Error loading posts:', error);
        showAlert('Error al cargar los mensajes.', 'danger');
        showEmptyState();
    }
}

/**
 * Render posts in the UI
 */
function renderPosts() {
    if (posts.length === 0) {
        showEmptyState();
        return;
    }
    
    const postsHTML = posts.map(post => createPostHTML(post)).join('');
    postsContainer.innerHTML = postsHTML;
    
    showPostsContainer();
    
    // Add animation to new posts
    const postElements = postsContainer.querySelectorAll('.post-item');
    postElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in');
    });
}

/**
 * Create HTML for a single post
 */
function createPostHTML(post) {
    const timestamp = formatTimestamp(post.timestamp);
    const timeAgo = getTimeAgo(post.timestamp);
    
    return `
        <div class="post-item hover-lift" data-post-id="${post.id}">
            <div class="d-flex justify-content-between align-items-start">
                <div class="flex-grow-1">
                    <div class="post-meta mb-2">
                        <span class="post-author">
                            <i class="fas fa-user-circle me-1"></i>
                            ${escapeHtml(post.author)}
                        </span>
                        <span class="post-timestamp ms-2">
                            <i class="fas fa-clock me-1"></i>
                            ${timeAgo}
                        </span>
                    </div>
                    <div class="post-content">
                        ${escapeHtml(post.content)}
                    </div>
                    <div class="post-timestamp mt-2">
                        <small class="text-muted">
                            <i class="fas fa-calendar me-1"></i>
                            ${timestamp}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Update character counter
 */
function updateCharacterCount() {
    const currentLength = contentInput.value.length;
    characterCount.textContent = currentLength;
    
    // Update counter color based on length
    characterCount.className = '';
    if (currentLength > MAX_CHARACTERS * 0.8) {
        characterCount.classList.add('char-warning');
    }
    if (currentLength > MAX_CHARACTERS * 0.95) {
        characterCount.classList.add('char-danger');
    }
    
    // Update form validation
    if (currentLength > MAX_CHARACTERS) {
        contentInput.classList.add('is-invalid');
    } else {
        contentInput.classList.remove('is-invalid');
    }
}

/**
 * Auto-resize textarea
 */
function autoResizeTextarea() {
    contentInput.style.height = 'auto';
    contentInput.style.height = (contentInput.scrollHeight) + 'px';
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + Enter to submit
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        if (!isLoading) {
            postForm.dispatchEvent(new Event('submit'));
        }
    }
}

/**
 * Clear the form
 */
function clearForm() {
    contentInput.value = '';
    authorInput.value = '';
    updateCharacterCount();
    autoResizeTextarea();
    contentInput.focus();
}

/**
 * Set loading state
 */
function setLoading(loading) {
    isLoading = loading;
    const submitButton = postForm.querySelector('button[type="submit"]');
    
    if (loading) {
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            Publicando...
        `;
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = `
            <i class="fas fa-paper-plane me-2"></i>
            Publicar Mensaje
        `;
    }
}

/**
 * Show different UI states
 */
function showLoadingState() {
    loadingState.classList.remove('d-none');
    postsContainer.classList.add('d-none');
    emptyState.classList.add('d-none');
}

function showPostsContainer() {
    loadingState.classList.add('d-none');
    postsContainer.classList.remove('d-none');
    emptyState.classList.add('d-none');
}

function showEmptyState() {
    loadingState.classList.add('d-none');
    postsContainer.classList.add('d-none');
    emptyState.classList.remove('d-none');
}

/**
 * Show alert messages
 */
function showAlert(message, type = 'info') {
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <i class="fas ${getAlertIcon(type)} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    alertContainer.innerHTML = alertHTML;
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const alert = alertContainer.querySelector('.alert');
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);
}

/**
 * Get icon for alert type
 */
function getAlertIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        danger: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

/**
 * Update statistics
 */
function updateStats() {
    totalPostsElement.textContent = posts.length;
    lastUpdateElement.textContent = new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Check system health
 */
async function checkSystemHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        
        const statusElement = document.getElementById('systemStatus');
        if (data.status === 'OK') {
            statusElement.innerHTML = '<span class="badge bg-success">Activo</span>';
        } else {
            statusElement.innerHTML = '<span class="badge bg-warning">Limitado</span>';
        }
    } catch (error) {
        const statusElement = document.getElementById('systemStatus');
        statusElement.innerHTML = '<span class="badge bg-danger">Error</span>';
    }
}

/**
 * Utility functions
 */
function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return 'Hace un momento';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} días`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Global functions for external access
window.loadPosts = loadPosts;
window.clearForm = clearForm;
