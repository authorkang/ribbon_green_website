// 문서 로딩 및 렌더링을 담당하는 클래스
class DocumentViewer {
    constructor() {
        this.currentDoc = null;
        this.contentElement = document.getElementById('documentContent');
        this.initEventListeners();
    }

    // 이벤트 리스너 초기화
    initEventListeners() {
        document.getElementById('docList').addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                const docName = e.target.dataset.doc;
                this.loadDocument(docName);
            }
        });
    }

    // 문서 로딩 함수
    async loadDocument(docName) {
        try {
            const response = await fetch(`doc/${docName}.md`);
            if (!response.ok) {
                throw new Error('문서를 불러올 수 없습니다.');
            }
            
            const content = await response.text();
            this.renderDocument(content);
            this.currentDoc = docName;
            
            // URL 해시 업데이트
            window.location.hash = docName;
        } catch (error) {
            console.error('문서 로딩 중 오류 발생:', error);
            this.contentElement.innerHTML = `
                <div class="error-message">
                    <h2>문서를 불러오는 중 오류가 발생했습니다.</h2>
                    <p>잠시 후 다시 시도해주세요.</p>
                </div>
            `;
        }
    }

    // 마크다운을 HTML로 변환하여 렌더링
    renderDocument(content) {
        // marked 라이브러리를 사용하여 마크다운을 HTML로 변환
        this.contentElement.innerHTML = marked(content);
    }

    // 초기 문서 로드
    init() {
        // URL 해시가 있으면 해당 문서를, 없으면 첫 번째 문서를 로드
        const initialDoc = window.location.hash.slice(1) || 'document1';
        this.loadDocument(initialDoc);
    }
}

// 페이지 로드 시 DocumentViewer 인스턴스 생성 및 초기화
document.addEventListener('DOMContentLoaded', () => {
    const viewer = new DocumentViewer();
    viewer.init();
});

// 상품 데이터는 기본 정보만 유지
const products = [
    {
        id: 1,
        name: "CNP Hyaluronic Derma Tension Cream 50ml",
        price: 19.25,
        description: "Soothing Gel Cream for Moisturizing\n[for all skin types]",
        images: [
            "img/card1_fig1.jpg",  // 확장자 추가
            "img/card1_fig2.jpg"   // 확장자 추가
        ],
        features: [
            "DERMA SOLUTION TESTED",
            "HYALURONIC ACID for moisturizing",
            "PANTHENOL for firming",
            "ADENOSINE for wrinkles",
            "NIACINAMIDE and VITAMIN-B for brightening up"
        ],
        fullDescription: `
            <div class="detail-section">
                <p class="product-description">Experience an incredible boost in facial elasticity. Revive dry, tired skin with deep hydration and lasting firmness—even in harsh weather. This rich yet powerful formula deeply hydrates your skin, restoring its firmness and leaving it feeling refreshed with long-lasting suppleness.</p>
            </div>
        `,
        priceNotice: "REMEMBER this price is 30% DISCOUNTED from the current international market price",
        usage: "In the final step of your skin care routine, gently apply an appropriate amount to the entire face.",
        ingredients: "Water, Glycerin, Cyclohexasiloxane, Hydrogenated Polydecene, 1,2-Hexanediol, Niacinamide, Dipropylene Glycol, Macadamia Ternifolia Seed Oil, Bis-PEG-15 Methyl Ether Dimethicone, Triethylhexanoin, Stearyl Alcohol, Glyceryl Stearate, PEG-40 Stearate, Pentaerythrityl Tetraethylhexanoate, Nymphaea Caerulea Flower Water, Cetearyl Alcohol, Dimethicone, Sorbitan Stearate, Panthenol, Hydroxyethylpiperazine Ethane Sulfonic Acid, Urea, Stearic Acid, Tromethamine, Sodium Hyaluronate (2,515ppm), Hyaluronic Acid (2,500.05ppm), PEG-100 Stearate, Cetearyl Olivate, Sorbitan Olivate, Hydrogenated Lecithin, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Dimethicone/Vinyl Dimethicone Crosspolymer, Carbomer, Glycosyl Trehalose, Hydrogenated Starch Hydrolysate, Xanthan Gum, Adenosine, Fragrance, Trisodium EDTA, Propanediol, Sodium Hyaluronate Crosspolymer (50ppm), Hydrolyzed Glycosaminoglycans, Benzyl Glycol, Hydrolyzed Hyaluronic Acid (2.5ppm), Hydroxypropyltrimonium Hyaluronate (1ppm), Sodium Acetylated Hyaluronate (1ppm), Ethylhexylglycerin, Hydrolyzed Collagen, Raspberry Ketone, Acetyl Tetrapeptide-9",
        specificInfo: {
            volume: "Cream 50mL, (Free Gift) Cream 31mL (Free Gift) Cream 31mL",
            skinType: "For all skin types",
            expiration: "36 months / 12 months after opening",
            manufacturer: "LG Household & Health Care Ltd. / LG Household & Health Care Ltd.",
            origin: "South Korea",
            // ... 나머지 상세 정보
        },
        packageOptions: [
            { size: "50ml", quantity: 1, price: 19.25, isSpecial: false },
            { size: "50ml + 62ml (31ml x2)", quantity: 1, price: 35.50, isSpecial: true }
        ]
    },
    {
        id: 2,
        name: "CNP Aqua Soothing Fresh Gel Cream 80ml",
        price: 18.50,
        description: "Soothing Gel Cream for Moisturizing\n[for all skin types]",
        images: [
            "img/card2_fig1.jpg",  // 첫 번째 이미지
            "img/card2_fig2.jpg"   // 두 번째 이미지
        ],
        fullDescription: `
            <div class="detail-section">
                <p class="product-description">A lightweight gel-cream formula that deeply replenishes moisture, building a strong hydration barrier. Cool down skin heat and boost up hydration! Restores the skin's oil-water balance, calming dry, rough skin for a dewy and healthy glow.</p>
            </div>
        `,
        features: [
            "Cooling Formula to Reduce Facial Heat",
            "PORTULACA OLERACEA EXTRACT for hydration",
            "ALLANTOIN for soothing and cooling",
            "Protective Barrier Formation",
            "Oil-Water Balancing"
        ],
        usage: "1. After cleansing, apply toner and spread an appropriate amount evenly over your face.<br>2. Reapply anytime you want to cool down your skin temperature.",
        ingredients: "Water, Glycerin, Sodium Cocoyl Glycinate, Cocamidopropyl Betaine, Sodium Chloride, Citric Acid",
        priceNotice: "REMEMBER this exclusive product is HARD TO FIND on the international market",
        packageOptions: [
            { size: "80ml", quantity: 1, price: 18.50, isSpecial: false },
            { size: "80ml", quantity: 2, price: 37.00, isSpecial: true }
        ]
    }
];

// 장바구니 관리 클래스
class CartManager {
    constructor() {
        this.cart = new Map(); // Map을 사용하여 상품ID와 수량을 관리
        this.initializeCart();
    }

    // 장바구니 초기화 및 이벤트 리스너 설정
    initializeCart() {
        this.renderProducts();
        this.setupEventListeners();
    }

    // 상품 목록 렌더링
    renderProducts() {
        const productsContainer = document.getElementById('products');
        if (!productsContainer) {
            console.error('Products container not found');
            return;
        }
        
        productsContainer.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image-slider">
                    <div class="slider-container" id="slider-${product.id}">
                        ${product.images.map(img => `<img src="${img}" alt="${product.name}">`).join('')}
                    </div>
                    <button class="slider-button prev" onclick="slideImages(${product.id}, 'prev')">❮</button>
                    <button class="slider-button next" onclick="slideImages(${product.id}, 'next')">❯</button>
                </div>
                <h3>${product.name}</h3>
                <p>${product.description.replace('\n', '<br>')}</p>
                <p class="product-price">€${product.price.toFixed(2)}</p>
                <div class="product-buttons">
                    <button class="primary-button" onclick="showProductDetail(${product.id}, this)">
                        View Details
                    </button>
                    <div class="product-detail-content" id="detail-content-${product.id}">
                        <div class="price-notice">
                            <div class="notice-content">
                                ${product.id === 1 ? `
                                    <p><span style="display: block; text-align: center;">▶REMEMBER◀</span><br>
                                    <span class="discount-number">30%</span><br>
                                    <span style="color: #FFD700;">DISCOUNTED</span><br>
                                    from the current international market price.</p>
                                    <div class="compare-link">
                                        <a href="https://global.oliveyoung.com/product/detail?prdtNo=GA211212966" 
                                           target="_blank" 
                                           class="market-link">
                                            Click Here to Compare the Price
                                        </a>
                                    </div>
                                ` : `
                                    <p><span style="display: block; text-align: center;">▶REMEMBER◀</span><br>
                                    <span style="color: #FFD700;">HARD TO FIND</span><br>
                                    on the international market.</p>
                                    <div class="compare-link">
                                        <a href="https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000167170" 
                                           target="_blank" 
                                           class="market-link">
                                            SEE How Popular in Korea Now
                                        </a>
                                    </div>
                                `}
                            </div>
                        </div>
                        ${product.fullDescription}
                        <div class="detail-section">
                            <h4>Key Features</h4>
                            <ul class="features-list">
                                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="detail-section">
                            <h4>How to Use</h4>
                            <p>${product.usage}</p>
                        </div>
                        <button class="specific-info-button" onclick="toggleSpecificInfo(this)">
                            Specific Item Information
                        </button>
                        <div class="specific-info-content">
                            ${product.id === 1 ? `
                                <div class="detail-section">
                                    <h4>Content volume or weight</h4>
                                    <p>Cream 50mL</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Ideal for</h4>
                                    <p>For all skin types</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Expiration date (or expiration date after opening)</h4>
                                    <p>36 months / 12 months after opening</p>
                                </div>
                                <div class="detail-section">
                                    <h4>How to Use</h4>
                                    <p>In the final step of your skin care routine, gently apply an appropriate amount to the entire face.</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Cosmetics manufacturers, cosmetics responsible distributors, and customized cosmetics sellers</h4>
                                    <p>LG Household & Health Care Ltd. / LG Household & Health Care Ltd.</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Country of Manufacture</h4>
                                    <p>South Korea</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Ingredients</h4>
                                    <p>${product.ingredients}</p>
                                </div>
                                <div class="detail-section">
                                    <h4>MFDS Evaluation of Functional Cosmetics</h4>
                                    <p>Completion of functional cosmetics review (or report) according to the Cosmetics Act</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Precautions when using</h4>
                                    <p>1) Consult a specialist if you have abnormal symptoms or side effects such as a skin rash, swelling, or itchiness during use or from exposure to direct sunlight after use.<br>
                                    2) Do not use on wounds or other affected areas.<br>
                                    3) Storage and handling instructions<br>
                                    a) Keep out of reach of children.<br>
                                    b) Keep away from direct sunlight.</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Quality Assurance Standard</h4>
                                    <p>Compensation for defective products is provided according to the criteria for the settlement of consumer disputes notified publicly by the Fair Trade Commission.</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Customer Service</h4>
                                    <p>+82-80-220-0707</p>
                                </div>
                            ` : `
                                <div class="detail-section">
                                    <h4>Content volume or weight</h4>
                                    <p>Cream 80mL</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Ideal for</h4>
                                    <p>For all skin types</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Expiration date (or expiration date after opening)</h4>
                                    <p>36 months / 12 months after opening</p>
                                </div>
                                <div class="detail-section">
                                    <h4>How to Use</h4>
                                    <p>1. After cleansing, apply toner and spread an appropriate amount evenly over your face.<br>
                                    2. Reapply anytime you want to cool down your skin temperature.</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Cosmetics manufacturers, cosmetics responsible distributors, and customized cosmetics sellers</h4>
                                    <p>Skin N Skin Ltd. / LG Household & Health Care Ltd.</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Country of Manufacture</h4>
                                    <p>South Korea</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Ingredients</h4>
                                    <p>Water, Butylene Glycol, Dimethicone, Glycerin, 1,2-Hexanediol, Cyclopentasiloxane, Sodium Polyacrylate, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Dimethiconol, Sodium Carbomer, Allantoin, PEG-60 Hydrogenated Castor Oil, Codonopsis Lanceolata Root Extract (Deodeok Root Extract), Tromethamine, Ficus Carica (Fig) Fruit Extract, Propylene Glycol, Melissa Officinalis (Lemon Balm) Leaf Extract, Punica Granatum (Pomegranate) Fruit Extract, Silica, Tocopheryl Acetate (Vitamin E Acetate), Pentylene Glycol, PEG/PPG-18/18 Dimethicone, Trideceth-6, Hyaluronic Acid, Malachite Extract, Citric Acid, Fructose, Urea, Portulaca Oleracea (Purslane) Extract, Sorbitol, Sodium Hyaluronate, Aloe Barbadensis (Aloe Vera) Leaf Juice Powder, Madecassoside, Maltose, Sodium Chloride, Sodium Lactate, Sodium PCA, Trehalose, Lavandula Angustifolia (Lavender) Flower Extract, Glucose, Sodium Hydroxide.</p>
                                </div>
                                <div class="detail-section">
                                    <h4>MFDS Evaluation of Functional Cosmetics</h4>
                                    <p>Not applicable</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Precautions when using</h4>
                                    <p>1) Consult a specialist if you have abnormal symptoms or side effects such as a skin rash, swelling, or itchiness during use or from exposure to direct sunlight after use.<br>
                                    2) Do not use on wounds or other affected areas.<br>
                                    3) Storage and handling instructions<br>
                                    a) Keep out of reach of children.<br>
                                    b) Keep away from direct sunlight.</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Quality Assurance Standard</h4>
                                    <p>Compensation for defective products is provided according to the criteria for the settlement of consumer disputes notified publicly by the Fair Trade Commission.</p>
                                </div>
                                <div class="detail-section">
                                    <h4>Customer Service</h4>
                                    <p>+82-80-023-7007</p>
                                </div>
                            `}
                            <button class="close-info-button" onclick="toggleSpecificInfo(this.closest('.specific-info-content').previousElementSibling)">
                                Close Item Information
                            </button>
                        </div>
                    </div>
                    <div class="add-to-cart-container">
                        <button class="primary-button" onclick="togglePackageOptions(${product.id}, this)">
                            Add to Cart
                        </button>
                        <div class="package-options" id="package-options-${product.id}">
                            ${product.id === 1 ? `
                                <div class="package-option">
                                    <span class="package-info">50ml x1 = €19.25</span>
                                    <button class="package-add-btn" onclick="cartManager.addToCartWithPackage(${product.id}, 'basic')">Add</button>
                                </div>
                                <div class="package-option">
                                    <span class="package-info">50ml x1 + 62ml (31ml x2) = €35.50</span>
                                    <button class="package-add-btn" onclick="cartManager.addToCartWithPackage(${product.id}, 'premium')">Add</button>
                                </div>
                            ` : `
                                <div class="package-option">
                                    <span class="package-info">80ml x1 = €18.50</span>
                                    <button class="package-add-btn" onclick="cartManager.addToCartWithPackage(${product.id}, 'basic')">Add</button>
                                </div>
                                <div class="package-option">
                                    <span class="package-info">80ml x2 = €37.00</span>
                                    <button class="package-add-btn" onclick="cartManager.addToCartWithPackage(${product.id}, 'premium')">Add</button>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 패키지 옵션을 포함한 장바구니 추가 함수 수정
    addToCartWithPackage(productId, packageType) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const packageOption = product.packageOptions.find(p => 
                packageType === 'basic' ? !p.isSpecial : p.isSpecial
            );
            
            const cartKey = `${productId}-${packageType}`;
            const quantity = this.cart.get(cartKey) || 0;
            this.cart.set(cartKey, quantity + 1);
            this.updateCartUI();
        }
    }

    // 장바구니에서 상품 제거
    removeFromCart(productId) {
        const quantity = this.cart.get(productId);
        if (quantity > 1) {
            this.cart.set(productId, quantity - 1);
        } else {
            this.cart.delete(productId);
        }
        this.updateCartUI();
    }

    // 장바구니에서 상품 완전히 제거
    removeAllFromCart(productId) {
        this.cart.delete(productId);
        this.updateCartUI();
    }

    // 장바구니 UI 업데이트 함수 수정
    updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const totalAmount = document.getElementById('total-amount');
        let total = 0;

        cartItems.innerHTML = Array.from(this.cart.entries()).map(([cartKey, quantity]) => {
            const [productId, packageType] = cartKey.split('-');
            const product = products.find(p => p.id === parseInt(productId));
            const packageOption = product.packageOptions.find(p => 
                packageType === 'basic' ? !p.isSpecial : p.isSpecial
            );
            
            const itemTotal = packageOption.price * quantity;
            total += itemTotal;

            // 상품 이름에서 용량 정보만 제거
            const simplifiedName = product.name
                .replace(' 80ml', '')
                .replace(' 50ml', '');

            return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <span class="cart-item-name">${simplifiedName}</span>
                        <span class="cart-item-size">${packageOption.size} x${packageOption.quantity}</span>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="cartManager.removeFromCart('${cartKey}')">-</button>
                            <span class="quantity">x${quantity}</span>
                            <button class="quantity-btn" onclick="cartManager.addToCartWithPackage(${productId}, '${packageType}')">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">
                        <span>€${itemTotal.toFixed(2)}</span>
                        <button class="remove-btn" onclick="cartManager.removeAllFromCart('${cartKey}')">
                            <span class="remove-icon">×</span>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        totalAmount.textContent = total.toFixed(2);

        // 장바구니가 비어있는 경우 메시지 표시
        if (this.cart.size === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        }
    }

    // 이벤트 리스너 설정
    setupEventListeners() {
        const orderButton = document.getElementById('order-button');
        const orderForm = document.getElementById('order-form');
        const customerForm = document.getElementById('customer-form');

        orderButton.addEventListener('click', () => {
            if (this.cart.size === 0) {
                alert('Please add items to your cart first.');
                return;
            }
            orderForm.classList.remove('hidden');
        });

        customerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.submitOrder(event);
        });
    }

    // 주문 제출 시 이메일 내용 수정
    async submitOrder(event) {
        const orderButton = document.getElementById('order-button');
        try {
            event.preventDefault();
            
            // 필수 입력값 확인
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const message = document.getElementById('message').value.trim();

            // 필수 입력값 검증
            if (!name || !email || !phone || !address) {
                alert("All fields are required!");
                return;
            }

            // 장바구니 상품 정보 수집
            const orderItems = Array.from(this.cart.entries()).map(([cartKey, quantity]) => {
                const [productId, packageType] = cartKey.split('-');
                const product = products.find(p => p.id === parseInt(productId));
                const packageOption = product.packageOptions.find(p => 
                    packageType === 'basic' ? !p.isSpecial : p.isSpecial
                );
                const itemTotal = packageOption.price * quantity;
                return `${product.name} (${packageOption.size} x${packageOption.quantity}) x${quantity}: €${itemTotal.toFixed(2)}`;
            }).join('\n');

            // 총 금액 계산
            const total = Array.from(this.cart.entries()).reduce((sum, [cartKey, quantity]) => {
                const [productId, packageType] = cartKey.split('-');
                const product = products.find(p => p.id === parseInt(productId));
                const packageOption = product.packageOptions.find(p => 
                    packageType === 'basic' ? !p.isSpecial : p.isSpecial
                );
                return sum + (packageOption.price * quantity);
            }, 0);

            const templateParams = {
                to_email: 'ribbon.green.cosmetics@gmail.com',
                from_name: name,
                from_email: email,
                phone: phone,
                delivery_method: document.querySelector('input[name="delivery_method"]:checked').value,
                address: address,
                order_details: orderItems,
                total_amount: `€${total.toFixed(2)}`,
                customer_message: message || 'No additional message'
            };

            // 이메일 전송 중임을 표시
            if (orderButton) {
                orderButton.disabled = true;
                orderButton.textContent = 'Processing...';
            }

            console.log('Sending email with params:', templateParams);  // 디버깅용

            // EmailJS를 사용하여 이메일 전송
            const response = await emailjs.send(
                'service_is82ixh',
                'template_rib846z',
                templateParams
            );

            console.log('Email response:', response);  // 디버깅용

            if (response.status === 200) {
                this.cart.clear();
                this.updateCartUI();
                document.getElementById('order-form').classList.add('hidden');
                document.getElementById('customer-form').reset();
                alert('Thank you for your order! We will contact you via email soon.');
            } else {
                throw new Error(`Failed to send email: ${response.text}`);
            }

        } catch (error) {
            console.error('Order submission error:', error);
            alert('There was an error processing your order. Please try again or contact us directly.');
        } finally {
            // 버튼 상태 복구
            if (orderButton) {
                orderButton.disabled = false;
                orderButton.textContent = 'Order Now';
            }
        }
    }
}

// 상세 페이지 관련 함수들
let currentSlide = {};

function showProductDetail(productId, button) {
    const detailContent = document.getElementById(`detail-content-${productId}`);
    
    // 다른 상세 내용이 열려있다면 닫기
    document.querySelectorAll('.product-detail-content').forEach(content => {
        if (content !== detailContent && content.classList.contains('active')) {
            content.classList.remove('active');
        }
    });
    
    // 현재 상세 내용 토글
    if (detailContent.classList.contains('active')) {
        detailContent.classList.remove('active');
    } else {
        detailContent.classList.add('active');
    }
}

function closeProductDetail(productId) {
    const detail = document.getElementById(`detail-${productId}`);
    const card = detail.closest('.product-card');
    
    if (detail) {
        detail.classList.remove('active');
        card.classList.remove('detail-open');
    }
}

function slideImages(productId, direction) {
    const slider = document.getElementById(`slider-${productId}`);
    const product = products.find(p => p.id === productId);
    const maxSlides = product.images.length;
    
    // 현재 슬라이드 위치가 없으면 0으로 초기화
    if (typeof currentSlide[productId] === 'undefined') {
        currentSlide[productId] = 0;
    }

    // 다음/이전 슬라이드 계산
    if (direction === 'next') {
        currentSlide[productId] = (currentSlide[productId] + 1) % maxSlides;
    } else {
        currentSlide[productId] = (currentSlide[productId] - 1 + maxSlides) % maxSlides;
    }

    // 슬라이더 이동
    slider.style.transform = `translateX(-${currentSlide[productId] * 100}%)`;
}

// 패키지 옵션 토글 함수 수정
function togglePackageOptions(productId, button, isDetail = false) {
    event.stopPropagation();
    const packageOptionsId = isDetail ? `detail-package-options-${productId}` : `package-options-${productId}`;
    const packageOptions = document.getElementById(packageOptionsId);
    
    // 현재 클릭된 패키지 옵션만 토글
    packageOptions.classList.toggle('active');
}

// Specific Info 토글 함수
window.toggleSpecificInfo = function(button) {
    const content = button.nextElementSibling;
    content.classList.toggle('active');
};

// CartManager 인스턴스 생성
document.addEventListener('DOMContentLoaded', () => {
    // CartManager 인스턴스 생성
    window.cartManager = new CartManager();
});

// 개인정보 동의 체크박스 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    const privacyCheckbox = document.getElementById('privacyCheckbox');
    const submitButton = document.getElementById('submitOrder');

    // 초기 상태 설정
    submitButton.style.display = 'block';  // 항상 보이도록 변경
    submitButton.classList.add('disabled'); // 처음에는 비활성화 상태
    submitButton.disabled = true;          // HTML 비활성화

    privacyCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            submitButton.classList.remove('disabled');
            submitButton.disabled = false;
        } else {
            submitButton.classList.add('disabled');
            submitButton.disabled = true;
        }
    });
});

// Order Now 버튼 클릭 시 주문 폼 표시
document.getElementById('order-button').addEventListener('click', function() {
    const cartItems = document.getElementById('cart-items');
    const orderForm = document.getElementById('order-form');
    const orderSummary = document.querySelector('.order-summary');
    const totalAmount = document.getElementById('total-amount').textContent;

    // 장바구니 내용을 HTML로 변환
    const cartItemsHTML = Array.from(cartItems.children).map(item => {
        const name = item.querySelector('.cart-item-name').textContent;
        const quantity = item.querySelector('.quantity').textContent.slice(1); // 'x2' -> '2'
        const size = item.querySelector('.cart-item-size').textContent;
        return `${name} (${size}) ${quantity}`;
    }).join('<br>');

    // 주문 내역 업데이트
    orderSummary.innerHTML = `${cartItemsHTML}<br>Total: €${totalAmount}`;

    // 주문 폼 표시
    orderForm.classList.remove('hidden');
    cartItems.parentElement.classList.add('hidden');
}); 