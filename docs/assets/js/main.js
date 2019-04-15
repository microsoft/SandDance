const SiteNav = {
    elems: {
        toggle: document.querySelector('#site-nav-toggle'),
        nav: document.querySelector('#site-nav')
    },

    is_open: false,

    toggle: function () {
        if (this.is_open) {
            this.close();
        } else {
            this.open();
        }
    },

    open: function () {
        document.documentElement.classList.add('is-nav-open');
        this.elems.nav.classList.add('is-open');
        this.is_open = true;

        // Close other menu
        TreeNav.close();
    },

    close: function () {
        document.documentElement.classList.remove('is-nav-open');
        this.elems.nav.classList.remove('is-open');
        this.is_open = false;
    },

    init: function () {
        // Show/hide menu when toggle is clicked
        this.elems.toggle.addEventListener('click', (e) => {
            this.toggle();
        });
    }
}
SiteNav.init();


const TreeNav = {
    elems: {
        toggle: document.querySelector('#site-tree-toggle'),
        nav: document.querySelector('#site-tree')
    },

    is_open: false,

    toggle: function () {
        if (this.is_open) {
            this.close();
        } else {
            this.open();
        }
    },

    open: function () {
        document.documentElement.classList.add('is-tree-open');
        this.elems.nav.classList.add('is-open');
        this.is_open = true;

        // Close other menu
        SiteNav.close();
    },

    close: function () {
        document.documentElement.classList.remove('is-tree-open');
        if (this.elems.nav) {
            this.elems.nav.classList.remove('is-open');
        }
        this.is_open = false;
    },

    init: function () {
        if (!this.elems.nav) {
            this.elems.toggle.style.display = 'none';
            return;
        }

        // Show/hide menu when toggle is clicked
        this.elems.toggle.addEventListener('click', (e) => {
            this.toggle();
        });

        const toggles = document.querySelectorAll('.js-tree-toggle');

        toggles.forEach((el) => {
            const ul = el.nextElementSibling;
            let h = ul.clientHeight;

            // Collapse if this list doesn't contain the active item
            const links = ul.querySelectorAll('a');
            let active = false;

            if (el.querySelector('a') && el.querySelector('a').classList.contains('is-active')) {
                active = true;
            } else {
                links.forEach((link) => {
                    if (link.classList.contains('is-active')) {
                        active = true;
                        el.classList.add('is-open');
                    }
                });
            }

            if (!active) ul.classList.add('u-hidden-visually');

            el.addEventListener('click', (e) => {
                el.classList.toggle('is-open');

                if (el.classList.contains('is-open')) {
                    // Open submenu
                    ul.style.height = 0;
                    ul.classList.remove('u-hidden-visually');
                    ul.style.height = h + 'px';
                } else {
                    // Close submenu
                    ul.style.height = 0;
                    setTimeout(() => {
                        ul.classList.add('u-hidden-visually');
                    }, 250);
                }
            });
        });
    }
}
TreeNav.init();


const Page = {
    settings: {
        darkClass: 'dark-theme',
        themeStorageKey: 'theme',
        themeSwitch: document.getElementById('dark-mode-toggle'),
        themes: ['Light', 'Dark']
    },

    setTheme: function (themeIndex) {
        if (themeIndex) {
            document.body.classList.add(this.settings.darkClass);
        } else {
            document.body.classList.remove(this.settings.darkClass);
        }
        var theme = this.settings.themes[themeIndex];
        this.settings.themeSwitch.innerText = this.settings.themes[1 - themeIndex];
        localStorage.setItem(this.settings.themeStorageKey, theme);
    },

    init: function () {
        var themeIndex = ~~(this.settings.themes.indexOf(localStorage.getItem(this.settings.themeStorageKey)) > 0);
        this.setTheme(themeIndex);

        this.settings.themeSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            themeIndex = ~~!themeIndex;
            this.setTheme(themeIndex);
        });
    }
}
Page.init();