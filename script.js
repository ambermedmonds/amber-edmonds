const topNav = document.querySelector('.top-nav')
const navToggle = document.querySelector('.nav-toggle')
const navMenu = document.querySelector('.top-nav-menu')

if (topNav && navToggle && navMenu) {
    const closeNavMenu = () => {
        topNav.classList.remove('is-open')
        navToggle.setAttribute('aria-expanded', 'false')
    }

    navToggle.addEventListener('click', () => {
        const isOpen = topNav.classList.toggle('is-open')
        navToggle.setAttribute('aria-expanded', String(isOpen))
    })

    document.addEventListener('click', (event) => {
        if (!topNav.contains(event.target)) {
            closeNavMenu()
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNavMenu()
        }
    })

    const navLinks = navMenu.querySelectorAll('a')
    for (const link of navLinks) {
        link.addEventListener('click', () => {
            closeNavMenu()
        })
    }
}

const filterButtons = document.querySelectorAll('.project-tags .tag')
const cards = document.querySelectorAll('.card')

if (filterButtons.length > 0) {
    for (const button of filterButtons) {
        button.addEventListener('click', () => {
            const filter = button.dataset.type

            // update is-active state
            for (const b of filterButtons) {
                b.classList.remove('is-active')
            }
            button.classList.add('is-active')

            for (const card of cards) {
                const types = card.dataset.type
                const shouldShow = filter === 'all' || types.includes(filter)
                
                if (shouldShow) {
                    card.style.display = ''
                } else {
                    card.style.display = 'none'
                }
            }
        })
    }
}

const projectVisualColumns = document.querySelectorAll('.project-case-right')

if (projectVisualColumns.length > 0) {
    for (const column of projectVisualColumns) {
        const scrollHint = document.createElement('p')
        scrollHint.className = 'project-scroll-hint'
        scrollHint.textContent = 'Scroll for more'
        scrollHint.setAttribute('aria-hidden', 'true')
        column.appendChild(scrollHint)

        const syncScrollHint = () => {
            const hasOverflow = (column.scrollHeight - column.clientHeight) > 24
            const hasScrolled = column.scrollTop > 12
            column.classList.toggle('can-scroll', hasOverflow)
            column.classList.toggle('scrolled', hasScrolled)
        }

        syncScrollHint()
        column.addEventListener('scroll', syncScrollHint, { passive: true })
        window.addEventListener('resize', syncScrollHint)
    }
}
