/* ============================================
   PetShield Insurance — Page Templates
   All 10 SPA page definitions with metadata
   ============================================ */

const PAGES = {
  '/': {
    name: 'Homepage',
    category: 'Home',
    tags: undefined,
    funnelPosition: 'TOFU',
    render: () => `
      <!-- Hero -->
      <section class="hero">
        <div class="hero-inner">
          <h1>Your Pet Deserves the Best Protection</h1>
          <p>PetShield Insurance covers accidents, illnesses, and routine care for dogs and cats. Get peace of mind knowing your furry family member is protected — plans start at just $19/month.</p>
          <a href="/get-quote" data-link class="btn btn-primary btn-lg"
             data-cta="true"
             data-cta-text="Get a Free Quote"
             data-cta-location="hero_banner"
             data-cta-destination="/get-quote"
             data-cta-type="primary">Get a Free Quote</a>
        </div>
      </section>

      <!-- Benefits -->
      <section class="section">
        <div class="section-inner">
          <div class="section-header">
            <h2>Why Choose PetShield?</h2>
            <p>Thousands of pet owners trust us to protect their companions</p>
          </div>
          <div class="cards-grid">
            <div class="card">
              <div class="card-icon">🏥</div>
              <h3>Comprehensive Coverage</h3>
              <p>From accidents and illnesses to hereditary conditions and chronic diseases. We cover vet visits, surgeries, prescriptions, diagnostic tests, and emergency care.</p>
            </div>
            <div class="card">
              <div class="card-icon">⚡</div>
              <h3>Fast Claims Processing</h3>
              <p>Submit your claim online and receive reimbursement within 5 business days. Our streamlined process means less paperwork and faster payouts for you.</p>
            </div>
            <div class="card">
              <div class="card-icon">💰</div>
              <h3>Affordable Plans</h3>
              <p>Plans starting at $19 per month with customizable deductibles and reimbursement levels. Choose the coverage that fits your budget and your pet's needs.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Banner -->
      <section class="section section-alt">
        <div class="section-inner text-center">
          <h2>Ready to Protect Your Pet?</h2>
          <p class="mb-3" style="color:var(--text-light);max-width:500px;margin-left:auto;margin-right:auto;">Join over 200,000 pet parents who trust PetShield. Get your personalized quote in under 2 minutes.</p>
          <a href="/get-quote" data-link class="btn btn-primary btn-lg"
             data-cta="true"
             data-cta-text="Start Your Quote"
             data-cta-location="cta_banner"
             data-cta-destination="/get-quote"
             data-cta-type="primary">Start Your Quote</a>
          <span style="margin:0 16px;color:var(--text-light);">or</span>
          <a href="/dog-insurance" data-link class="btn btn-secondary btn-lg"
             data-cta="true"
             data-cta-text="Explore Plans"
             data-cta-location="cta_banner"
             data-cta-destination="/dog-insurance"
             data-cta-type="secondary">Explore Plans</a>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="section">
        <div class="section-inner">
          <div class="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real stories from PetShield policyholders</p>
          </div>
          <div class="testimonials-grid">
            <div class="testimonial">
              <div class="testimonial-text">"When our golden retriever Max tore his ACL, PetShield covered the entire $4,200 surgery. The claim was processed in just 3 days. I can't recommend them enough."</div>
              <div class="testimonial-author">
                <div class="testimonial-avatar">🐕</div>
                <div class="testimonial-info">
                  <strong>Sarah M.</strong>
                  <span>Golden Retriever Owner, Austin TX</span>
                </div>
              </div>
            </div>
            <div class="testimonial">
              <div class="testimonial-text">"My cat Luna was diagnosed with kidney disease last year. PetShield has covered all her treatments and medications. The monthly premium pays for itself many times over."</div>
              <div class="testimonial-author">
                <div class="testimonial-avatar">🐈</div>
                <div class="testimonial-info">
                  <strong>James R.</strong>
                  <span>British Shorthair Owner, Portland OR</span>
                </div>
              </div>
            </div>
            <div class="testimonial">
              <div class="testimonial-text">"Signing up was incredibly easy. I got a quote in under a minute, and the coverage started the next day. Best decision I've made for my two beagles."</div>
              <div class="testimonial-author">
                <div class="testimonial-avatar">🐶</div>
                <div class="testimonial-info">
                  <strong>Maria L.</strong>
                  <span>Beagle Owner, Denver CO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  },

  '/dog-insurance': {
    name: 'Dog Insurance',
    category: 'Products / Dog Insurance',
    tags: 'Dog, Insurance',
    funnelPosition: 'MOFU',
    render: () => `
      <section class="product-hero">
        <h1>🐕 Dog Insurance</h1>
        <p>Comprehensive health coverage for your canine companion. From routine checkups to emergency surgeries, we've got your dog covered at every stage of life.</p>
        <a href="/get-quote" data-link class="btn btn-primary btn-lg"
           data-cta="true"
           data-cta-text="Get a Dog Insurance Quote"
           data-cta-location="product_hero"
           data-cta-destination="/get-quote"
           data-cta-type="primary">Get a Dog Insurance Quote</a>
      </section>

      <!-- Coverage Details -->
      <section class="section">
        <div class="section-inner">
          <div class="section-header">
            <h2>What's Covered</h2>
            <p>Our dog insurance plans provide robust protection</p>
          </div>
          <div class="coverage-grid">
            <div class="coverage-item">
              <span class="coverage-icon">🩺</span>
              <div>
                <h4>Accidents & Injuries</h4>
                <p>Broken bones, lacerations, swallowed objects, and more</p>
              </div>
            </div>
            <div class="coverage-item">
              <span class="coverage-icon">💊</span>
              <div>
                <h4>Illnesses & Diseases</h4>
                <p>Cancer, diabetes, infections, digestive issues, and allergies</p>
              </div>
            </div>
            <div class="coverage-item">
              <span class="coverage-icon">🧬</span>
              <div>
                <h4>Hereditary Conditions</h4>
                <p>Hip dysplasia, heart conditions, and breed-specific issues</p>
              </div>
            </div>
            <div class="coverage-item">
              <span class="coverage-icon">🏥</span>
              <div>
                <h4>Emergency Care</h4>
                <p>Emergency vet visits, overnight stays, and critical care</p>
              </div>
            </div>
            <div class="coverage-item">
              <span class="coverage-icon">💉</span>
              <div>
                <h4>Prescriptions</h4>
                <p>Medications, supplements, and prescription diets</p>
              </div>
            </div>
            <div class="coverage-item">
              <span class="coverage-icon">🔬</span>
              <div>
                <h4>Diagnostics</h4>
                <p>X-rays, blood work, MRIs, ultrasounds, and CT scans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section class="section section-alt">
        <div class="section-inner">
          <div class="section-header">
            <h2>Dog Insurance Plans</h2>
            <p>Choose the plan that's right for your pup</p>
          </div>
          <div class="pricing-grid">
            <div class="pricing-card">
              <h3>Essential</h3>
              <p style="color:var(--text-light);font-size:0.9rem;">Accident-only coverage</p>
              <div class="pricing-price">$19<span>/mo</span></div>
              <ul class="pricing-features">
                <li>Accidents & injuries</li>
                <li>Emergency vet visits</li>
                <li>$5,000 annual limit</li>
                <li>$500 deductible</li>
                <li>70% reimbursement</li>
              </ul>
              <a href="/get-quote" data-link class="btn btn-secondary"
                 data-cta="true"
                 data-cta-text="Choose Essential"
                 data-cta-location="pricing_section"
                 data-cta-destination="/get-quote"
                 data-cta-type="secondary">Choose Essential</a>
            </div>
            <div class="pricing-card featured">
              <h3>Complete</h3>
              <p style="color:var(--text-light);font-size:0.9rem;">Accident + illness coverage</p>
              <div class="pricing-price">$39<span>/mo</span></div>
              <ul class="pricing-features">
                <li>Everything in Essential</li>
                <li>Illnesses & diseases</li>
                <li>Hereditary conditions</li>
                <li>$15,000 annual limit</li>
                <li>$250 deductible</li>
                <li>80% reimbursement</li>
              </ul>
              <a href="/get-quote" data-link class="btn btn-primary"
                 data-cta="true"
                 data-cta-text="Choose Complete"
                 data-cta-location="pricing_section"
                 data-cta-destination="/get-quote"
                 data-cta-type="primary">Choose Complete</a>
            </div>
            <div class="pricing-card">
              <h3>Ultimate</h3>
              <p style="color:var(--text-light);font-size:0.9rem;">Full coverage + wellness</p>
              <div class="pricing-price">$59<span>/mo</span></div>
              <ul class="pricing-features">
                <li>Everything in Complete</li>
                <li>Routine wellness exams</li>
                <li>Vaccinations & dental</li>
                <li>Unlimited annual limit</li>
                <li>$100 deductible</li>
                <li>90% reimbursement</li>
              </ul>
              <a href="/get-quote" data-link class="btn btn-secondary"
                 data-cta="true"
                 data-cta-text="Choose Ultimate"
                 data-cta-location="pricing_section"
                 data-cta-destination="/get-quote"
                 data-cta-type="secondary">Choose Ultimate</a>
            </div>
          </div>
        </div>
      </section>
    `
  },

  '/cat-insurance': {
    name: 'Cat Insurance',
    category: 'Products / Cat Insurance',
    tags: 'Cat, Insurance',
    funnelPosition: 'MOFU',
    render: () => `
      <section class="product-hero" style="background:linear-gradient(135deg,#023E8A,#0096C7);">
        <h1>🐈 Cat Insurance</h1>
        <p>Tailored health coverage designed specifically for felines. Protect your cat from unexpected veterinary costs and ensure they get the care they deserve.</p>
        <a href="/get-quote" data-link class="btn btn-primary btn-lg"
           data-cta="true"
           data-cta-text="Get a Cat Insurance Quote"
           data-cta-location="product_hero"
           data-cta-destination="/get-quote"
           data-cta-type="primary">Get a Cat Insurance Quote</a>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="section-header">
            <h2>What's Covered</h2>
            <p>Specialized coverage for common feline health concerns</p>
          </div>
          <div class="coverage-grid">
            <div class="coverage-item">
              <span class="coverage-icon">🩺</span>
              <div>
                <h4>Accidents & Injuries</h4>
                <p>Falls, bites, ingested objects, and trauma</p>
              </div>
            </div>
            <div class="coverage-item">
              <span class="coverage-icon">🫘</span>
              <div>
                <h4>Kidney & Urinary Issues</h4>
                <p>Chronic kidney disease, urinary blockages, and UTIs</p>
              </div>
            </div>
            <div class="coverage-item">
              <span class="coverage-icon">🦷</span>
              <div>
                <h4>Dental Disease</h4>
                <p>Tooth extractions, stomatitis, and dental cleanings</p>
              </div>
            </div>
            <div class="coverage-item">
              <span class="coverage-icon">🧬</span>
              <div>
                <h4>Hereditary Conditions</h4>
                <p>Heart disease (HCM), polycystic kidney disease (PKD)</p>
              </div>
            </div>
            <div class="coverage-item">
              <span class="coverage-icon">🏥</span>
              <div>
                <h4>Cancer Treatment</h4>
                <p>Chemotherapy, radiation, surgery, and diagnostics</p>
              </div>
            </div>
            <div class="coverage-item">
              <span class="coverage-icon">💊</span>
              <div>
                <h4>Chronic Conditions</h4>
                <p>Diabetes, hyperthyroidism, asthma, and IBD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="section-inner">
          <div class="section-header">
            <h2>Cat Insurance Plans</h2>
            <p>Affordable coverage for your feline friend</p>
          </div>
          <div class="pricing-grid">
            <div class="pricing-card">
              <h3>Essential</h3>
              <p style="color:var(--text-light);font-size:0.9rem;">Accident-only coverage</p>
              <div class="pricing-price">$15<span>/mo</span></div>
              <ul class="pricing-features">
                <li>Accidents & injuries</li>
                <li>Emergency vet visits</li>
                <li>$5,000 annual limit</li>
                <li>$500 deductible</li>
                <li>70% reimbursement</li>
              </ul>
              <a href="/get-quote" data-link class="btn btn-secondary"
                 data-cta="true"
                 data-cta-text="Choose Essential"
                 data-cta-location="pricing_section"
                 data-cta-destination="/get-quote"
                 data-cta-type="secondary">Choose Essential</a>
            </div>
            <div class="pricing-card featured">
              <h3>Complete</h3>
              <p style="color:var(--text-light);font-size:0.9rem;">Accident + illness coverage</p>
              <div class="pricing-price">$32<span>/mo</span></div>
              <ul class="pricing-features">
                <li>Everything in Essential</li>
                <li>Illnesses & diseases</li>
                <li>Hereditary conditions</li>
                <li>$15,000 annual limit</li>
                <li>$250 deductible</li>
                <li>80% reimbursement</li>
              </ul>
              <a href="/get-quote" data-link class="btn btn-primary"
                 data-cta="true"
                 data-cta-text="Choose Complete"
                 data-cta-location="pricing_section"
                 data-cta-destination="/get-quote"
                 data-cta-type="primary">Choose Complete</a>
            </div>
            <div class="pricing-card">
              <h3>Ultimate</h3>
              <p style="color:var(--text-light);font-size:0.9rem;">Full coverage + wellness</p>
              <div class="pricing-price">$49<span>/mo</span></div>
              <ul class="pricing-features">
                <li>Everything in Complete</li>
                <li>Annual wellness exams</li>
                <li>Vaccinations & dental</li>
                <li>Unlimited annual limit</li>
                <li>$100 deductible</li>
                <li>90% reimbursement</li>
              </ul>
              <a href="/get-quote" data-link class="btn btn-secondary"
                 data-cta="true"
                 data-cta-text="Choose Ultimate"
                 data-cta-location="pricing_section"
                 data-cta-destination="/get-quote"
                 data-cta-type="secondary">Choose Ultimate</a>
            </div>
          </div>
        </div>
      </section>
    `
  },

  '/blog': {
    name: 'Blog Listing',
    category: 'Blog / Articles',
    tags: 'Blog',
    funnelPosition: 'TOFU',
    render: () => `
      <section class="section">
        <div class="section-inner">
          <div class="section-header">
            <h2>PetShield Blog</h2>
            <p>Expert advice, tips, and stories for pet owners</p>
          </div>
          <div class="blog-grid">
            <div class="blog-card">
              <div class="blog-card-image">🐕</div>
              <div class="blog-card-body">
                <div class="blog-card-meta">January 15, 2025 &bull; 5 min read</div>
                <h3>Best Dog Names for 2025: Top 100 Picks</h3>
                <p>Choosing the perfect name for your new puppy? Here are the most popular and creative dog names trending this year.</p>
                <a href="/blog/best-dog-names-2025" data-link class="btn btn-sm btn-secondary"
                   data-cta="true"
                   data-cta-text="Read Article"
                   data-cta-location="blog_listing"
                   data-cta-destination="/blog/best-dog-names-2025"
                   data-cta-type="secondary">Read Article</a>
              </div>
            </div>
            <div class="blog-card">
              <div class="blog-card-image">🥗</div>
              <div class="blog-card-body">
                <div class="blog-card-meta">January 8, 2025 &bull; 7 min read</div>
                <h3>Understanding Your Cat's Nutritional Needs</h3>
                <p>A veterinarian's guide to choosing the right food for your cat at every life stage, from kitten to senior.</p>
                <a href="/blog" data-link class="btn btn-sm btn-secondary"
                   data-cta="true"
                   data-cta-text="Read Article"
                   data-cta-location="blog_listing"
                   data-cta-destination="/blog"
                   data-cta-type="secondary">Read Article</a>
              </div>
            </div>
            <div class="blog-card">
              <div class="blog-card-image">🏥</div>
              <div class="blog-card-body">
                <div class="blog-card-meta">December 20, 2024 &bull; 6 min read</div>
                <h3>How Pet Insurance Actually Works: A Complete Guide</h3>
                <p>Everything you need to know about pet insurance claims, deductibles, reimbursements, and what's covered.</p>
                <a href="/blog" data-link class="btn btn-sm btn-secondary"
                   data-cta="true"
                   data-cta-text="Read Article"
                   data-cta-location="blog_listing"
                   data-cta-destination="/blog"
                   data-cta-type="secondary">Read Article</a>
              </div>
            </div>
            <div class="blog-card">
              <div class="blog-card-image">🐾</div>
              <div class="blog-card-body">
                <div class="blog-card-meta">December 10, 2024 &bull; 4 min read</div>
                <h3>5 Signs Your Pet Needs to Visit the Vet</h3>
                <p>Don't wait until it's an emergency. Learn the subtle signs that indicate your pet needs medical attention.</p>
                <a href="/blog" data-link class="btn btn-sm btn-secondary"
                   data-cta="true"
                   data-cta-text="Read Article"
                   data-cta-location="blog_listing"
                   data-cta-destination="/blog"
                   data-cta-type="secondary">Read Article</a>
              </div>
            </div>
            <div class="blog-card">
              <div class="blog-card-image">❄️</div>
              <div class="blog-card-body">
                <div class="blog-card-meta">November 28, 2024 &bull; 5 min read</div>
                <h3>Winter Safety Tips for Dogs and Cats</h3>
                <p>Cold weather can pose risks to your pets. Here's how to keep them warm, safe, and healthy during winter.</p>
                <a href="/blog" data-link class="btn btn-sm btn-secondary"
                   data-cta="true"
                   data-cta-text="Read Article"
                   data-cta-location="blog_listing"
                   data-cta-destination="/blog"
                   data-cta-type="secondary">Read Article</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  },

  '/blog/best-dog-names-2025': {
    name: 'Blog Article',
    category: 'Blog / Articles / Dog Names',
    tags: 'Blog, Dog',
    funnelPosition: 'TOFU',
    render: () => `
      <div class="article-page">
        <a href="/blog" data-link style="color:var(--primary);font-size:0.9rem;">&larr; Back to Blog</a>
        <h1 class="mt-3">Best Dog Names for 2025: Top Picks for Every Personality</h1>
        <div class="article-meta">Published January 15, 2025 &bull; By Dr. Emily Carter, DVM &bull; 5 min read</div>

        <div class="article-body">
          <p>Welcoming a new puppy into your home is one of life's greatest joys. But with that excitement comes an important decision: what to name your new best friend. Whether you're looking for something classic, trendy, or totally unique, we've compiled the top dog names for 2025 based on data from veterinary records, breed registries, and our own PetShield policyholder database.</p>

          <h2>Top 10 Male Dog Names</h2>
          <ol>
            <li><strong>Milo</strong> — A friendly, approachable name that's been climbing the charts for three years running.</li>
            <li><strong>Charlie</strong> — A timeless classic that never goes out of style.</li>
            <li><strong>Cooper</strong> — Perfect for adventurous, outdoorsy pups.</li>
            <li><strong>Teddy</strong> — Ideal for fluffy breeds that are basically living stuffed animals.</li>
            <li><strong>Bear</strong> — For those big, lovable dogs with hearts of gold.</li>
            <li><strong>Ollie</strong> — Short, sweet, and full of personality.</li>
            <li><strong>Rocky</strong> — A strong name for confident, bold dogs.</li>
            <li><strong>Buddy</strong> — Because that's exactly what they are.</li>
            <li><strong>Duke</strong> — Regal and distinguished.</li>
            <li><strong>Leo</strong> — For brave little lions.</li>
          </ol>

          <h2>Top 10 Female Dog Names</h2>
          <ol>
            <li><strong>Luna</strong> — The undisputed champion for the fifth year in a row.</li>
            <li><strong>Bella</strong> — Beautiful name for a beautiful pup.</li>
            <li><strong>Daisy</strong> — Cheerful and bright, perfect for happy-go-lucky dogs.</li>
            <li><strong>Lucy</strong> — Classic and endearing.</li>
            <li><strong>Willow</strong> — Elegant and graceful.</li>
            <li><strong>Zoe</strong> — Greek for "life" — perfect for energetic pups.</li>
            <li><strong>Sadie</strong> — Sweet and loyal.</li>
            <li><strong>Molly</strong> — A beloved name that stands the test of time.</li>
            <li><strong>Bailey</strong> — Gender-neutral and full of charm.</li>
            <li><strong>Nala</strong> — Inspired by the brave lioness from The Lion King.</li>
          </ol>

          <h2>Trending Name Themes for 2025</h2>
          <p>This year, we're seeing some interesting naming trends among pet owners:</p>
          <ul>
            <li><strong>Food names</strong> are bigger than ever: Biscuit, Mochi, Waffles, Peanut, and Ginger are all on the rise.</li>
            <li><strong>Nature-inspired names</strong> continue to grow: River, Sage, Fern, Aspen, and Storm are popular choices.</li>
            <li><strong>Human names</strong> remain a strong category: Oliver, Henry, Stella, and Sophie work just as well for dogs as they do for humans.</li>
            <li><strong>Pop culture references</strong> are always in play: Loki, Grogu, Arya, and even Barbie made appearances in our data.</li>
          </ul>

          <h2>Tips for Choosing the Right Name</h2>
          <p>When picking a name for your new dog, consider these veterinarian-approved tips:</p>
          <ul>
            <li>Choose a name with one or two syllables — dogs respond better to shorter names.</li>
            <li>Avoid names that sound like common commands (e.g., "Kit" sounds like "sit").</li>
            <li>Test the name out loud — you'll be calling it in the park, at the vet, and across the house.</li>
            <li>Give your dog a few days to "grow into" the name. Sometimes the perfect name reveals itself once you get to know their personality.</li>
          </ul>

          <p>Whatever you choose, the most important thing is that it feels right for you and your new companion. And don't forget — once you've named your pup, it's time to protect them with a PetShield insurance plan!</p>

          <div class="mt-4 text-center">
            <a href="/get-quote" data-link class="btn btn-primary btn-lg"
               data-cta="true"
               data-cta-text="Protect Your New Pup"
               data-cta-location="article_cta"
               data-cta-destination="/get-quote"
               data-cta-type="primary">Protect Your New Pup — Get a Quote</a>
          </div>
        </div>
      </div>
    `
  },

  '/get-quote': {
    name: 'Get a Quote',
    category: 'Lead Capture / Quote Form',
    tags: 'Quote, Lead',
    funnelPosition: 'BOFU',
    render: () => `
      <div class="form-page">
        <h1>Get Your Free Quote</h1>
        <p class="form-subtitle">Tell us about your pet and we'll create a personalized insurance plan in seconds.</p>

        <form id="quote-form">
          <div class="form-group">
            <label for="pet-type">Pet Type *</label>
            <select id="pet-type" required>
              <option value="">Select pet type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="pet-name">Pet Name *</label>
              <input type="text" id="pet-name" placeholder="e.g. Luna" required>
            </div>
            <div class="form-group">
              <label for="pet-breed">Breed *</label>
              <input type="text" id="pet-breed" placeholder="e.g. Golden Retriever" required>
            </div>
          </div>

          <div class="form-group">
            <label for="pet-age">Pet Age *</label>
            <select id="pet-age" required>
              <option value="">Select age</option>
              <option value="under-1">Under 1 year</option>
              <option value="1-3">1-3 years</option>
              <option value="4-7">4-7 years</option>
              <option value="8-plus">8+ years</option>
            </select>
          </div>

          <hr style="margin:24px 0;border:none;border-top:1px solid var(--light-gray);">
          <h3 style="margin-bottom:16px;color:var(--primary-dark);">Your Information</h3>

          <div class="form-row">
            <div class="form-group">
              <label for="owner-first">First Name *</label>
              <input type="text" id="owner-first" placeholder="John" required>
            </div>
            <div class="form-group">
              <label for="owner-last">Last Name *</label>
              <input type="text" id="owner-last" placeholder="Doe" required>
            </div>
          </div>

          <div class="form-group">
            <label for="owner-email">Email Address *</label>
            <input type="email" id="owner-email" placeholder="john@example.com" required>
          </div>

          <div class="form-group">
            <label for="owner-phone">Phone Number</label>
            <input type="tel" id="owner-phone" placeholder="(555) 123-4567">
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-lg"
                    data-cta="true"
                    data-cta-text="Get My Free Quote"
                    data-cta-location="quote_form"
                    data-cta-destination="/get-quote"
                    data-cta-type="primary">Get My Free Quote</button>
          </div>
        </form>

        <div id="quote-success" style="display:none;" class="form-success">
          <div class="success-icon">✅</div>
          <h2>Quote Request Received!</h2>
          <p>Thank you! We've received your information and will send your personalized quote to your email within minutes. A PetShield advisor may also reach out to help you choose the best plan.</p>
          <a href="/" data-link class="btn btn-primary"
             data-cta="true"
             data-cta-text="Return to Homepage"
             data-cta-location="quote_success"
             data-cta-destination="/"
             data-cta-type="secondary">Return to Homepage</a>
        </div>
      </div>
    `
  },

  '/about': {
    name: 'About Us',
    category: 'Company / About',
    tags: 'Company',
    funnelPosition: 'TOFU',
    render: () => `
      <section class="about-hero">
        <h1>About PetShield Insurance</h1>
        <p>We're on a mission to make quality pet healthcare accessible and affordable for every pet owner in America.</p>
      </section>

      <section class="section">
        <div class="section-inner" style="max-width:800px;">
          <h2 style="color:var(--primary-dark);margin-bottom:16px;">Our Story</h2>
          <p style="color:var(--dark-gray);line-height:1.8;margin-bottom:16px;">PetShield Insurance was founded in 2018 by a team of veterinarians and tech entrepreneurs who saw a growing gap between the rising cost of veterinary care and what pet owners could afford. After watching too many families face impossible choices at the vet's office, they decided to build something better.</p>
          <p style="color:var(--dark-gray);line-height:1.8;margin-bottom:16px;">Today, PetShield protects over 200,000 dogs and cats across all 50 states. We've paid out more than $150 million in claims, and we process the average claim in under 5 business days. Our goal is simple: no pet owner should ever have to choose between their pet's health and their family's finances.</p>

          <h2 style="color:var(--primary-dark);margin:32px 0 16px;">Our Mission</h2>
          <p style="color:var(--dark-gray);line-height:1.8;margin-bottom:16px;">We believe every pet deserves access to quality veterinary care, regardless of their owner's financial situation. PetShield exists to remove the financial barriers between pets and the healthcare they need.</p>

          <h2 style="color:var(--primary-dark);margin:32px 0 16px;">Our Values</h2>
          <div class="cards-grid" style="margin-bottom:32px;">
            <div class="card">
              <div class="card-icon">❤️</div>
              <h3>Pets First</h3>
              <p>Every decision we make starts with one question: is this good for pets and their families?</p>
            </div>
            <div class="card">
              <div class="card-icon">🤝</div>
              <h3>Transparency</h3>
              <p>No hidden exclusions, no surprise denials. We're upfront about what's covered and what isn't.</p>
            </div>
            <div class="card">
              <div class="card-icon">⚡</div>
              <h3>Speed</h3>
              <p>When your pet is sick, the last thing you need is a slow insurance company. We move fast.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="section-inner">
          <div class="section-header">
            <h2>Our Leadership Team</h2>
            <p>Meet the people behind PetShield</p>
          </div>
          <div class="team-grid">
            <div class="team-member">
              <div class="team-avatar">👩‍⚕️</div>
              <h4>Dr. Sarah Chen</h4>
              <p>Co-Founder & CEO</p>
            </div>
            <div class="team-member">
              <div class="team-avatar">👨‍💻</div>
              <h4>Michael Torres</h4>
              <p>Co-Founder & CTO</p>
            </div>
            <div class="team-member">
              <div class="team-avatar">👩‍💼</div>
              <h4>Jessica Park</h4>
              <p>VP of Operations</p>
            </div>
            <div class="team-member">
              <div class="team-avatar">👨‍⚕️</div>
              <h4>Dr. James Wilson</h4>
              <p>Chief Veterinary Officer</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section text-center">
        <div class="section-inner">
          <h2 style="color:var(--primary-dark);margin-bottom:12px;">Ready to Join the PetShield Family?</h2>
          <p style="color:var(--text-light);max-width:500px;margin:0 auto 24px;">Get a personalized quote in under 2 minutes.</p>
          <a href="/get-quote" data-link class="btn btn-primary btn-lg"
             data-cta="true"
             data-cta-text="Get Your Quote"
             data-cta-location="about_cta"
             data-cta-destination="/get-quote"
             data-cta-type="primary">Get Your Quote</a>
        </div>
      </section>
    `
  },

  '/signup': {
    name: 'Sign Up',
    category: 'Account / Registration',
    tags: 'Account, Registration',
    funnelPosition: 'BOFU',
    render: () => `
      <div class="form-page">
        <h1>Create Your Account</h1>
        <p class="form-subtitle">Sign up to manage your policies, track claims, and access exclusive member benefits.</p>

        <form id="signup-form">
          <div class="form-group">
            <label for="signup-email">Email Address *</label>
            <input type="email" id="signup-email" placeholder="you@example.com" required>
          </div>
          <div class="form-group">
            <label for="signup-password">Password *</label>
            <input type="password" id="signup-password" placeholder="Minimum 6 characters" required minlength="6">
          </div>
          <div class="form-group">
            <label for="signup-confirm">Confirm Password *</label>
            <input type="password" id="signup-confirm" placeholder="Confirm your password" required>
          </div>
          <div id="signup-error" class="form-error" style="display:none;"></div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-lg">Create Account</button>
          </div>
          <p class="mt-2 text-center" style="font-size:0.9rem;color:var(--text-light);">
            Already have an account? <a href="/signin" data-link>Sign in</a>
          </p>
        </form>
      </div>
    `
  },

  '/signin': {
    name: 'Sign In',
    category: 'Account / Login',
    tags: 'Account, Login',
    funnelPosition: 'BOFU',
    render: () => `
      <div class="form-page">
        <h1>Sign In</h1>
        <p class="form-subtitle">Access your PetShield account to manage policies and claims.</p>

        <form id="signin-form">
          <div class="form-group">
            <label for="signin-email">Email Address *</label>
            <input type="email" id="signin-email" placeholder="you@example.com" required>
          </div>
          <div class="form-group">
            <label for="signin-password">Password *</label>
            <input type="password" id="signin-password" placeholder="Your password" required>
          </div>
          <div id="signin-error" class="form-error" style="display:none;"></div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-lg">Sign In</button>
          </div>
          <p class="mt-2 text-center" style="font-size:0.9rem;color:var(--text-light);">
            Don't have an account? <a href="/signup" data-link>Create one</a>
          </p>
        </form>
      </div>
    `
  },

  '/account': {
    name: 'My Account',
    category: 'Account / Dashboard',
    tags: 'Account, Dashboard',
    funnelPosition: 'BOFU',
    render: () => {
      const user = JSON.parse(sessionStorage.getItem('petshield_user') || 'null');
      if (!user) return ''; // Router will redirect

      return `
        <div class="account-page">
          <h1>👋 Welcome Back</h1>
          <p class="account-email">Signed in as <strong>${user.email}</strong></p>

          <div class="card mb-4">
            <h3 style="margin-bottom:4px;">Policy Status</h3>
            <p style="color:var(--success);font-weight:600;">Active — Complete Plan (Dog)</p>
            <p style="color:var(--text-light);font-size:0.9rem;">Policy #PS-2025-${user.userId.substring(0,8).toUpperCase()}</p>
          </div>

          <h3 style="margin-bottom:12px;color:var(--primary-dark);">Recent Claims</h3>
          <table class="claims-table">
            <thead>
              <tr>
                <th>Claim #</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CLM-4821</td>
                <td>Jan 10, 2025</td>
                <td>Annual wellness exam</td>
                <td>$285.00</td>
                <td><span class="status-badge status-approved">Approved</span></td>
              </tr>
              <tr>
                <td>CLM-4956</td>
                <td>Jan 22, 2025</td>
                <td>Dental cleaning & extraction</td>
                <td>$1,420.00</td>
                <td><span class="status-badge status-pending">Pending</span></td>
              </tr>
              <tr>
                <td>CLM-5012</td>
                <td>Feb 1, 2025</td>
                <td>Elective procedure (cosmetic)</td>
                <td>$650.00</td>
                <td><span class="status-badge status-rejected">Rejected</span></td>
              </tr>
            </tbody>
          </table>

          <div class="account-actions">
            <button id="logout-btn" class="btn btn-danger">Log Out</button>
          </div>
        </div>
      `;
    }
  }
};

// Route metadata lookup helper
function getPageMeta(path) {
  const page = PAGES[path];
  if (!page) return null;
  return {
    name: page.name,
    category: page.category,
    tags: page.tags,
    funnelPosition: page.funnelPosition
  };
}
