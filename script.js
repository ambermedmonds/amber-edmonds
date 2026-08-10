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

const pageSectionLinks = document.querySelectorAll('.top-nav-left a[href^="#"]')

if (pageSectionLinks.length > 0) {
    const pageSections = Array.from(pageSectionLinks)
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean)
    let selectedHash = window.location.hash || '#home'

    const setSelectedNavLink = (hash) => {
        selectedHash = hash

        for (const link of pageSectionLinks) {
            link.classList.toggle('selected', link.getAttribute('href') === selectedHash)
        }
    }

    const updateSelectedNavLink = () => {
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12
        const navOffset = topNav ? topNav.offsetHeight + 80 : 164
        const scrollPosition = window.scrollY + navOffset
        let activeHash = `#${pageSections[0].id}`

        for (const section of pageSections) {
            if (atBottom || section.offsetTop <= scrollPosition) {
                activeHash = `#${section.id}`
            }
        }

        setSelectedNavLink(activeHash)
    }

    for (const link of pageSectionLinks) {
        link.addEventListener('click', () => {
            setSelectedNavLink(link.getAttribute('href'))
        })
    }

    setSelectedNavLink(selectedHash)
    updateSelectedNavLink()
    window.addEventListener('scroll', updateSelectedNavLink, { passive: true })
    window.addEventListener('resize', updateSelectedNavLink)
    window.addEventListener('hashchange', updateSelectedNavLink)
}

const typewriterWord = document.querySelector('.typewriter-word')

if (typewriterWord) {
    const words = ['visual designer.', 'digital marketer.', 'web developer.', 'content creator.']
    let wordIndex = 0
    let letterIndex = 0
    let isDeleting = false

    const typeWord = () => {
        const currentWord = words[wordIndex]
        typewriterWord.textContent = currentWord.slice(0, letterIndex)

        if (!isDeleting && letterIndex < currentWord.length) {
            letterIndex += 1
            window.setTimeout(typeWord, 90)
            return
        }

        if (!isDeleting && letterIndex === currentWord.length) {
            isDeleting = true
            window.setTimeout(typeWord, 1200)
            return
        }

        if (isDeleting && letterIndex > 0) {
            letterIndex -= 1
            window.setTimeout(typeWord, 55)
            return
        }

        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
        window.setTimeout(typeWord, 250)
    }

    typeWord()
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

