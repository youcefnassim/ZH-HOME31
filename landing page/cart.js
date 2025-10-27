// Shopping Cart Functionality
let cart = [];

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    loadCart();
    
    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    // Update cart display
    updateCartDisplay();
    
    // Update order form with cart data
    updateOrderForm();
});

// Add item to cart
function addToCart(e) {
    const button = e.target.closest('.add-to-cart');
    const model = button.dataset.model;
    const price = parseInt(button.dataset.price);
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.model === model);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            model: model,
            price: price,
            quantity: 1
        });
    }
    
    // Save cart and update display
    saveCart();
    updateCartDisplay();
    updateOrderForm();
    
    // Show feedback
    showAddToCartFeedback(button);
}

// Show feedback when item is added
function showAddToCartFeedback(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Ajouté !';
    button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)';
    }, 1500);
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    const totalAmountElement = document.getElementById('totalAmount');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide. Ajoutez des produits ci-dessus.</p>';
        cartTotalContainer.style.display = 'none';
        return;
    }
    
    // Generate cart items HTML
    let cartHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.model}</h4>
                    <p>${item.price.toLocaleString()} DA / unité</p>
                </div>
                <div class="item-controls">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeItem(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    totalAmountElement.textContent = total.toLocaleString() + ' DA';
    cartTotalContainer.style.display = 'block';
}

// Update item quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    saveCart();
    updateCartDisplay();
    updateOrderForm();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
    updateOrderForm();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('zhHomeCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('zhHomeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Update order form with cart data
function updateOrderForm() {
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) return;
    
    // Add hidden input for cart data
    let cartInput = document.getElementById('cartData');
    if (!cartInput) {
        cartInput = document.createElement('input');
        cartInput.type = 'hidden';
        cartInput.id = 'cartData';
        cartInput.name = 'cartData';
        orderForm.appendChild(cartInput);
    }
    
    // Update cart data
    cartInput.value = JSON.stringify(cart);
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Add hidden input for total
    let totalInput = document.getElementById('orderTotal');
    if (!totalInput) {
        totalInput = document.createElement('input');
        totalInput.type = 'hidden';
        totalInput.id = 'orderTotal';
        totalInput.name = 'orderTotal';
        orderForm.appendChild(totalInput);
    }
    
    totalInput.value = total;
}

// Enhanced form submission for cart page
if (document.getElementById('orderForm')) {
    document.getElementById('orderForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('Votre panier est vide. Veuillez ajouter des produits avant de commander.');
            return;
        }
        
        const submitButton = e.target.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        try {
            // Collect form data
            const formData = new FormData(e.target);
            
            // Prepare cart summary
            const cartSummary = cart.map(item => 
                `${item.model} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} DA`
            ).join('\n');
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            const orderData = {
                timestamp: new Date().toLocaleString('fr-FR'),
                fullName: formData.get('fullName'),
                whatsapp: formData.get('whatsapp'),
                wilaya: formData.get('wilaya'),
                address: formData.get('address'),
                color: formData.get('color') || 'Non spécifiée',
                comments: formData.get('comments') || 'Aucun commentaire',
                cartItems: cartSummary,
                total: total + ' DA',
                itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
            };
            
            // Send to Google Sheets
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec';
            
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });
            
            // Show success message
            document.getElementById('orderForm').style.display = 'none';
            document.getElementById('thankYouMessage').style.display = 'block';
            
            // Clear cart
            cart = [];
            saveCart();
            updateCartDisplay();
            
            // Scroll to thank you message
            document.getElementById('thankYouMessage').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Reset form after 5 seconds
            setTimeout(() => {
                document.getElementById('orderForm').reset();
                document.getElementById('orderForm').style.display = 'block';
                document.getElementById('thankYouMessage').style.display = 'none';
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 5000);
            
        } catch (error) {
            console.error('Error submitting order:', error);
            
            // Show error message
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur - Réessayer';
            submitButton.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)';
            }, 3000);
            
            // Fallback: redirect to WhatsApp with order details
            const whatsappMessage = `Bonjour! Je souhaite commander:\n\n` +
                `Nom: ${orderData.fullName}\n` +
                `WhatsApp: ${orderData.whatsapp}\n` +
                `Wilaya: ${orderData.wilaya}\n` +
                `Adresse: ${orderData.address}\n` +
                `Couleur préférée: ${orderData.color}\n` +
                `\nProduits commandés:\n${orderData.cartItems}\n` +
                `\nTotal: ${orderData.total}\n` +
                `Commentaires: ${orderData.comments}`;
            
            const whatsappUrl = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${encodeURIComponent(whatsappMessage)}`;
            
            setTimeout(() => {
                if (confirm('Erreur de connexion. Voulez-vous envoyer votre commande via WhatsApp?')) {
                    window.open(whatsappUrl, '_blank');
                }
            }, 1000);
        }
    });
}
