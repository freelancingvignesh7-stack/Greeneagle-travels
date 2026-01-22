let needsAccommodation = null;
    let adultsCount = 1;
    let childrenCount = 0;
    let selectedAccommodation = '3-Star';
    let childAges = [];

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      const fabBar = document.getElementById('fabBar');
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      clearTimeout(window.scrollTimer);
      fabBar.classList.remove('show');
      window.scrollTimer = setTimeout(() => {
        fabBar.classList.add('show');
      }, 300);
    });

    // Mobile menu
    function openMenu() {
      document.getElementById('mobileMenu').classList.add('active');
      document.getElementById('menuOverlay').classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      document.getElementById('mobileMenu').classList.remove('active');
      document.getElementById('menuOverlay').classList.remove('show');
      document.body.style.overflow = '';
    }

    // Accommodation Yes/No
    function selectAccommodation(choice) {
      needsAccommodation = choice === 'yes';

      document.getElementById('accomYes').classList.remove('active');
      document.getElementById('accomNo').classList.remove('active');

      if (choice === 'yes') {
        document.getElementById('accomYes').classList.add('active');
        document.getElementById('accommodationDetails').classList.remove('hidden');
      } else {
        document.getElementById('accomNo').classList.add('active');
        document.getElementById('accommodationDetails').classList.add('hidden');
      }
    }

    // Counter controls
    function changeCounter(type, delta) {
      if (type === 'adults') {
        adultsCount = Math.max(1, adultsCount + delta);
        document.getElementById('adultsCount').textContent = adultsCount;
      } else if (type === 'children') {
        childrenCount = Math.max(0, Math.min(10, childrenCount + delta));
        document.getElementById('childrenCount').textContent = childrenCount;
        updateChildAges();
      }
    }

    // Update child age inputs
    function updateChildAges() {
      const container = document.getElementById('childAges');
      const agesContainer = document.getElementById('childAgesContainer');

      if (childrenCount === 0) {
        agesContainer.classList.add('hidden');
        childAges = [];
        return;
      }

      agesContainer.classList.remove('hidden');
      container.innerHTML = '';

      for (let i = 0; i < childrenCount; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'age-input-wrapper';
        wrapper.innerHTML = `
          <input type="number"
                 class="form-control"
                 placeholder="Child ${i + 1} Age"
                 min="0"
                 max="17"
                 id="childAge${i}"
                 onchange="updateChildAge(${i}, this.value)">
        `;
        container.appendChild(wrapper);
      }
    }

    function updateChildAge(index, value) {
      childAges[index] = value;
    }

    // Stay selection
    function selectStay(element) {
      document.querySelectorAll('.stay-option').forEach(opt => {
        opt.classList.remove('active');
      });
      element.classList.add('active');
      selectedAccommodation = element.getAttribute('data-value');
    }

    // WhatsApp submission
    function sendWhatsApp(e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const pickup = document.getElementById('pickup').value;
      const destination = document.getElementById('destination').value;
      const places = document.getElementById('places').value;
      const startDate = document.getElementById('startDate').value;
      const endDate = document.getElementById('endDate').value;
      const vehicle = document.getElementById('vehicle').value;

      let message = `🌟 *New Booking Enquiry - Green Eagle Tours*\n\n`;
      message += `👤 *Name:* ${name}\n`;
      message += `📱 *Phone:* ${phone}\n`;
      if (pickup) message += `📍 *Pickup:* ${pickup}\n`;
      if (destination) message += `📍 *Drop:* ${destination}\n`;
      if (places) message += `🗺️ *Places to Visit:* ${places}\n`;
      if (startDate) message += `📅 *Start:* ${new Date(startDate).toLocaleString()}\n`;
      if (endDate) message += `📅 *End:* ${new Date(endDate).toLocaleString()}\n`;
      if (vehicle) message += `🚗 *Vehicle:* ${vehicle}\n`;

      if (needsAccommodation === true) {
        message += `\n🏨 *Accommodation Required:* Yes\n`;
        message += `👨 *Adults:* ${adultsCount}\n`;
        message += `👶 *Children:* ${childrenCount}\n`;

        if (childrenCount > 0) {
          message += `*Child Ages:* `;
          const ages = [];
          for (let i = 0; i < childrenCount; i++) {
            const age = childAges[i] || 'Not specified';
            ages.push(age);
          }
          message += ages.join(', ') + '\n';
        }

        message += `🏨 *Accommodation Type:* ${selectedAccommodation}\n`;
      } else if (needsAccommodation === false) {
        message += `\n🏨 *Accommodation Required:* No\n`;
      }

      const whatsappURL = `https://wa.me/919751415617?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, '_blank');
    }

    // Initial FAB show
    setTimeout(() => {
      document.getElementById('fabBar').classList.add('show');
    }, 2000);
