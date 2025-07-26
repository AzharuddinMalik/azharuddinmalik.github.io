
        // --- ENHANCED JAVASCRIPT ---

        // Initialize theme from localStorage
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);



        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function () {
            // MOBILE MENU TOGGLE FUNCTIONALITY
            function initializeMobileMenu() {
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarToggler && navbarCollapse) {
                    navbarToggler.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        navbarCollapse.classList.toggle('show');
                        const isExpanded = navbarCollapse.classList.contains('show');
                        navbarToggler.setAttribute('aria-expanded', isExpanded);
                        if (isExpanded) {
                            document.body.style.overflow = 'hidden';
                        } else {
                            document.body.style.overflow = '';
                        }
                    });
                    document.addEventListener('click', function (e) {
                        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                            if (navbarCollapse.classList.contains('show')) {
                                navbarCollapse.classList.remove('show');
                                navbarToggler.setAttribute('aria-expanded', 'false');
                                document.body.style.overflow = '';
                            }
                        }
                    });
                    window.addEventListener('resize', function () {
                        if (window.innerWidth > 992) {
                            navbarCollapse.classList.remove('show');
                            navbarToggler.setAttribute('aria-expanded', 'false');
                            document.body.style.overflow = '';
                        }
                    });
                }
            }

            // THEME TOGGLE FUNCTIONALITY
            function toggleTheme() {
                const html = document.documentElement;
                const current = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', current);
                localStorage.setItem('theme', current);
                updateThemeIcon(current);
            }

            function updateThemeIcon(theme) {
                const themeIcon = document.getElementById('themeIcon');
                if (themeIcon) {
                    if (theme === 'dark') {
                        themeIcon.innerHTML = '<path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>';
                    } else {
                        themeIcon.innerHTML = '<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 011.06-1.06l1.591 1.591a.75.75 0 11-1.06 1.06l-1.591-1.591zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75z"/>';
                    }
                }
            }

            window.toggleTheme = toggleTheme;

// ---------------------------------------- TYPED.JS INITIALIZATION ----------------------------------------//
            function initializeTypedText() {
                const typedElement = document.getElementById('typed');
                const texts = ['Expert P.O.P ','Gypsum Work', 'Lavish Interiors', 'Jaipur\'s Best'];
                let currentIndex = 0;
                let charIndex = 0;
                let isDeleting = false;
                let typingSpeed = 150;

                function type() {
                    const currentText = texts[currentIndex];

                    if (isDeleting) {
                        typedElement.textContent = currentText.substring(0, charIndex - 1);
                        charIndex--;
                        typingSpeed = 100;
                    } else {
                        typedElement.textContent = currentText.substring(0, charIndex + 1);
                        charIndex++;
                        typingSpeed = 150;
                    }

                    if (!isDeleting && charIndex === currentText.length) {
                        isDeleting = true;
                        typingSpeed = 1500;
                    } else if (isDeleting && charIndex === 0) {
                        isDeleting = false;
                        currentIndex = (currentIndex + 1) % texts.length;
                        typingSpeed = 500;
                    }

                    setTimeout(type, typingSpeed);
                }

                type();
            }

            // NAVBAR SCROLL EFFECT
            function initializeScrollEffect() {
                window.addEventListener('scroll', function () {
                    const navbar = document.querySelector('.navbar');
                    if (navbar) {
                        if (window.scrollY > 50) {
                            navbar.classList.add('scrolled');
                        } else {
                            navbar.classList.remove('scrolled');
                        }
                    }
                });
            }

            // CALCULATOR LOGIC
            function initializeCalculator() {
                const rates = { pop: 28, gypsum: 70, full: 1500 };
                function updateQuote() {
                    const serviceType = document.getElementById('serviceType');
                    const area = document.getElementById('area');
                    const finish = document.getElementById('finish');
                    const quoteResult = document.getElementById('quoteResult');
                    if (serviceType && area && finish && quoteResult) {
                        const type = serviceType.value;
                        const areaValue = parseInt(area.value) || 0;
                        const finishMultipliers = { basic: 1, premium: 1.2, luxury: 1.5 };
                        const price = Math.round(areaValue * rates[type] * finishMultipliers[finish.value]);
                        quoteResult.textContent = `₹ ${price.toLocaleString()}`;
                    }
                }
                window.updateQuote = updateQuote;
                updateQuote(); // Initial calculation
                ['serviceType', 'area', 'finish'].forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.addEventListener('change', updateQuote);
                        element.addEventListener('input', updateQuote);
                    }
                });
            }

            // SMOOTH SCROLL FUNCTIONALITY
            function initializeSmoothScroll() {
                window.scrollToSection = function (sectionId) {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        const offsetTop = element.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                };

                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const href = this.getAttribute('href');
                        if (href && href.startsWith('#')) {
                            const targetId = href.substring(1);
                            const targetElement = document.getElementById(targetId);
                            if (targetElement) {
                                const offsetTop = targetElement.offsetTop - 80;
                                window.scrollTo({
                                    top: offsetTop,
                                    behavior: 'smooth'
                                });
                            }
                            const navbarCollapse = document.querySelector('.navbar-collapse');
                            const navbarToggler = document.querySelector('.navbar-toggler');
                            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                                navbarCollapse.classList.remove('show');
                                if (navbarToggler) {
                                    navbarToggler.setAttribute('aria-expanded', 'false');
                                }
                                document.body.style.overflow = '';
                            }
                        }
                    });
                });
            }

            // FADE ON SCROLL ANIMATION
            function initializeFadeOnScroll() {
                if ('IntersectionObserver' in window) {
                    const io = new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            entry.target.classList.toggle('show', entry.isIntersecting);
                        });
                    }, {
                        threshold: 0.2, // Trigger when 20% of the element is visible
                        rootMargin: '0px 0px -50px 0px' // Start animation slightly before reaching bottom
                    });
                    document.querySelectorAll('.fade').forEach(el => {
                        io.observe(el);
                    });
                } else {
                    // Fallback for browsers that don't support IntersectionObserver
                    document.querySelectorAll('.fade').forEach(el => {
                        el.classList.add('show');
                    });
                }
            }


            // CONTACT FORM HANDLING (for both forms)
            function setupFormSubmission(formId) {
                const form = document.getElementById(formId);
                if (form) {
                    form.addEventListener('submit', async function (e) {
                        e.preventDefault(); // Prevent default form submission

                        // Simple validation
                        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
                        let allFieldsFilled = true;
                        inputs.forEach(input => {
                            if (!input.value.trim()) {
                                allFieldsFilled = false;
                            }
                        });

                        if (!allFieldsFilled) {
                            showMessageBox('Please fill in all required fields.', 'error');
                            return;
                        }

                        // Collect form data
                        const formData = new FormData(form);
                        const data = {};
                        formData.forEach((value, key) => {
                            data[key] = value;
                        });

                        try {
                            const response = await fetch('https://formspree.io/f/mblowogr', {
                                method: 'POST',
                                body: formData,
                                headers: {
                                    'Accept': 'application/json'
                                }
                            });

                            if (response.ok) {
                                showMessageBox('Thank you for your message! We will get back to you soon.', 'success');
                                form.reset(); // Clear the form
                                document.getElementById('llmResponse').style.display = 'none'; // Hide LLM response on new submission
                                document.getElementById('llmResponseContent').innerHTML = ''; // Clear LLM content
                            } else {
                                const errorData = await response.json();
                                showMessageBox(`Oops! Something went wrong. ${errorData.error || ''}`, 'error');
                                console.error('Form submission error:', errorData);
                            }
                        } catch (error) {
                            showMessageBox('An error occurred while sending your message. Please try again later.', 'error');
                            console.error('Network error during form submission:', error);
                        }
                    });
                }
            }

            // Custom Message Box (replaces alert())
            function showMessageBox(message, type = 'info') {
                const existingMessageBox = document.getElementById('customMessageBox');
                if (existingMessageBox) {
                    existingMessageBox.remove();
                }

                const messageBox = document.createElement('div');
                messageBox.id = 'customMessageBox';
                messageBox.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: ${type === 'success' ? '#4CAF50' : (type === 'error' ? '#f44336' : '#2196F3')};
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
                    font-family: var(--font-body), sans-serif;
                    max-width: 90%;
                    text-align: center;
                `;
                messageBox.textContent = message;
                document.body.appendChild(messageBox);

                setTimeout(() => {
                    messageBox.style.opacity = '1';
                    messageBox.style.transform = 'translateX(-50%) translateY(0)';
                }, 100);

                setTimeout(() => {
                    messageBox.style.opacity = '0';
                    messageBox.style.transform = 'translateX(-50%) translateY(-20px)';
                    messageBox.addEventListener('transitionend', () => messageBox.remove());
                }, 5000); // Message disappears after 5 seconds
            }

            // STATS COUNTER ANIMATION
            function initializeStatsCounter() {
                const counters = document.querySelectorAll('.stats-counter');
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const counter = entry.target;
                            const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
                            const increment = target / 200; // Adjust for smoother animation
                            let current = 0;
                            const updateCounter = () => {
                                if (current < target) {
                                    current += increment;
                                    counter.textContent = Math.floor(current) + '+'; // Add '+' sign
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    counter.textContent = target + '+'; // Ensure final value has '+'
                                }
                            };
                            updateCounter();
                            observer.unobserve(counter); // Stop observing once animated
                        }
                    });
                }, { threshold: 0.5 }); // Trigger when 50% of the element is visible
                counters.forEach(counter => observer.observe(counter));
            }

            // Gemini API Integration - Get Project Ideas (Contact Form)
            async function getProjectIdeas() {
                const projectDetails = document.getElementById('contactMessage').value;
                const serviceType = document.getElementById('contactService').value;
                const llmResponseDiv = document.getElementById('llmResponse');
                const llmResponseContent = document.getElementById('llmResponseContent');
                const llmLoadingSpinner = document.getElementById('llmLoadingSpinner');

                if (!projectDetails.trim() || !serviceType.trim()) {
                    showMessageBox('Please provide project details and select a service to get ideas. ', 'info'); // Please provide project details and select a service to get ideas.  कृपया विचार प्राप्त करने के लिए प्रोजेक्ट विवरण प्रदान करें और एक सेवा चुनें
                    return;
                }

                llmResponseContent.innerHTML = ''; // Clear previous ideas
                llmResponseDiv.style.display = 'block'; // Show the container
                llmLoadingSpinner.style.display = 'block'; // Show spinner

                const prompt = `The user is planning a project for '${serviceType}' with the following details: '${projectDetails}'. Based on this, provide creative and practical ideas, design suggestions, or potential enhancements for their project. Focus on innovative solutions and aesthetic improvements. Keep the response concise and actionable, formatted as a bulleted list.`;

                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });

                const payload = { contents: chatHistory };
                const apiKey = "AIzaSyADnMa7DnYY84wSZxbpXOSU7G1g9GVCwRY"; // Canvas will automatically provide the API key
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        const text = result.candidates[0].content.parts[0].text;
                        // Convert markdown list to HTML list
                        const htmlList = text.split('\n').map(line => {
                            if (line.startsWith('* ') || line.startsWith('- ')) {
                                return `<li>${line.substring(2).trim()}</li>`;
                            }
                            return line; // Return as is if not a list item
                        }).join('');
                        llmResponseContent.innerHTML = `<ul>${htmlList}</ul>`;
                    } else {
                        llmResponseContent.innerHTML = '<p>Could not generate ideas. Please try again.</p>'; // Could not generate ideas. Please try again.  िचार उत्पन्न नहीं कर सका। कृपया पुनः प्रयास करें।
                        console.error('Gemini API response structure unexpected:', result);
                    }
                } catch (error) {
                    llmResponseContent.innerHTML = '<p>Error connecting to the idea generator. Please try again later.</p>'; // Error connecting to the idea generator. Please try again later.
                    console.error('Error calling Gemini API:', error);
                } finally {
                    llmLoadingSpinner.style.display = 'none'; // Hide spinner
                }
            }

            // Gemini API Integration - Service Elaborator/Summarizer (Services Section)
            async function handleServiceAction(actionType, serviceName, currentDescription, targetElementId, spinnerId) {
                const targetElement = document.getElementById(targetElementId);
                const spinner = document.getElementById(spinnerId);

                if (!targetElement || !spinner) {
                    console.error('Target element or spinner not found for service elaboration/summary.'); // Target element or spinner not found for service elaboration/summary. लक्ष्य तत्व या स्पिनर सेवा विस्तार/सारांश के लिए नहीं मिला।
                    return;
                }

                // Toggle visibility: if already visible, hide it and clear content
                if (targetElement.style.display === 'block') {
                    targetElement.style.display = 'none';
                    targetElement.innerHTML = '';
                    return;
                }

                targetElement.innerHTML = ''; // Clear previous content
                targetElement.style.display = 'block'; // Show the container
                spinner.style.display = 'block'; // Show spinner

                let prompt = '';
                if (actionType === 'elaborate') {
                    prompt = `Elaborate on the following service: '${serviceName}'. The current brief description is: '${currentDescription}'. Provide a more detailed and engaging description, highlighting its benefits, unique selling points, and what a client can expect. Keep it concise, around 2-3 paragraphs.`;
                } else if (actionType === 'summarize') {
                    prompt = `इस सर्विस की जानकारी को ज़्यादा संक्षेप में लिखो: '${serviceName}'. वर्तमान संक्षिप्त विवरण है: '${currentDescription}'. लगभग 50-60 शब्दों में सभी मुख्य बिंदुओं को कवर करो, ताकि विजिटर्स को जल्दी से समझ आ जाए।`; // Summarize this service information more concisely. The current brief description is: '${currentDescription}'. Cover all main points in about 50-60 words, so visitors can quickly understand.
                }

                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });

                const payload = { contents: chatHistory };
                const apiKey = ""; // Canvas will automatically provide the API key
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        const text = result.candidates[0].content.parts[0].text;
                        // For elaborate, convert newlines to paragraphs. For summarize, just set text.
                        if (actionType === 'elaborate') {
                            targetElement.innerHTML = text.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('');
                        } else {
                            targetElement.textContent = text.trim(); // Display as plain text for summary
                        }
                    } else {
                        targetElement.innerHTML = '<p>Could not generate information. Please try again.</p>'; // Could not generate information. Please try again.
                        console.error('Gemini API response structure unexpected for service action:', result);
                    }
                } catch (error) {
                    targetElement.innerHTML = '<p>Error connecting to the information generator. Please try again later.</p>'; // Error connecting to the information generator. Please try again later.
                    console.error('Error calling Gemini API for service action:', error);
                } finally {
                    spinner.style.display = 'none'; // Hide spinner
                }
            }
            window.handleServiceAction = handleServiceAction; // Make globally accessible

            // Initialize all functionality
            try {
                initializeMobileMenu();
                updateThemeIcon(savedTheme); // Set initial icon based on saved theme
                initializeScrollEffect();
                initializeCalculator();
                initializeSmoothScroll();
                initializeFadeOnScroll();
                setupFormSubmission('homeContactForm'); // Initialize quick enquiry form
                setupFormSubmission('contactForm');    // Initialize main contact form
                initializeStatsCounter();
                initializeTypedText();

                // Attach event listener for the "Get Project Ideas" button
                const getIdeasBtn = document.getElementById('getIdeasBtn');
                if (getIdeasBtn) {
                    getIdeasBtn.addEventListener('click', getProjectIdeas);
                }

                // Attach event listeners for the new "Elaborate" and "Summarize" buttons in Services section
                document.querySelectorAll('.service-action-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const actionType = this.getAttribute('data-action');
                        const serviceName = this.getAttribute('data-service-name');
                        const serviceDesc = this.getAttribute('data-service-desc');
                        const targetId = this.getAttribute('data-target-id');
                        const spinnerId = this.getAttribute('data-spinner-id');
                        handleServiceAction(actionType, serviceName, serviceDesc, targetId, spinnerId);
                    });
                });

                console.log('MAD Associates - All scripts initialized successfully!');
            } catch (error) {
                console.error('Error initializing scripts:', error);
            }
        });
