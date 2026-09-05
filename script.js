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
const topNavCenter = document.querySelector('.top-nav-center')

if (pageSectionLinks.length > 0) {
    const pageSections = Array.from(pageSectionLinks)
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean)

    const setSelectedNavLink = (hash) => {
        for (const link of pageSectionLinks) {
            link.classList.toggle('selected', link.getAttribute('href') === hash)
        }

        if (topNavCenter) {
            topNavCenter.classList.toggle('selected', !hash)
        }
    }

    const updateSelectedNavLink = () => {
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12
        const navOffset = topNav ? topNav.offsetHeight + 80 : 164
        const scrollPosition = window.scrollY + navOffset
        let activeHash = null

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

    updateSelectedNavLink()
    window.addEventListener('scroll', updateSelectedNavLink, { passive: true })
    window.addEventListener('resize', updateSelectedNavLink)
    window.addEventListener('hashchange', updateSelectedNavLink)
}

const projectTocLinks = document.querySelectorAll('.project-toc a[href^="#"]')

if (projectTocLinks.length > 0) {
    const tocSections = Array.from(projectTocLinks)
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean)

    const setSelectedTocLink = (hash) => {
        for (const link of projectTocLinks) {
            link.classList.toggle('selected', link.getAttribute('href') === hash)
        }
    }

    const updateSelectedTocLink = () => {
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12
        const navOffset = topNav ? topNav.offsetHeight + 80 : 164
        const scrollPosition = window.scrollY + navOffset
        let activeHash = null

        for (const section of tocSections) {
            if (atBottom || section.offsetTop <= scrollPosition) {
                activeHash = `#${section.id}`
            }
        }

        setSelectedTocLink(activeHash)
    }

    for (const link of projectTocLinks) {
        link.addEventListener('click', () => {
            setSelectedTocLink(link.getAttribute('href'))
        })
    }

    updateSelectedTocLink()
    window.addEventListener('scroll', updateSelectedTocLink, { passive: true })
    window.addEventListener('resize', updateSelectedTocLink)
    window.addEventListener('hashchange', updateSelectedTocLink)
}

const typewriterWord = document.querySelector('.typewriter-word')
const typewriterPrefix = document.querySelector('.typewriter-prefix')

if (typewriterWord) {
    const prefixText = typewriterPrefix ? typewriterPrefix.textContent : ''
    const sequence = [
        { text: 'product builder.', final: false },
        { text: 'creative strategist.', final: false },
        { text: 'visual designer.', final: false },
        { text: 'brand marketer.', final: false },
        { text: 'competitive athlete.', final: false },
        { text: 'Thanks for stopping by ☺', final: true },
    ]
    let entryIndex = 0
    let letterIndex = 0
    let isDeleting = false
    let prefixLength = prefixText.length

    const setPrefix = () => {
        if (typewriterPrefix) {
            typewriterPrefix.textContent = prefixText.slice(0, prefixLength)
        }
    }

    const animatePrefix = (targetLength, onDone) => {
        const deleting = targetLength < prefixLength

        const step = () => {
            if (prefixLength === targetLength) {
                onDone()
                return
            }

            prefixLength += deleting ? -1 : 1
            setPrefix()
            window.setTimeout(step, deleting ? 55 : 90)
        }

        step()
    }

    const typeWord = () => {
        const entry = sequence[entryIndex]
        typewriterWord.textContent = entry.text.slice(0, letterIndex)

        if (!isDeleting && letterIndex < entry.text.length) {
            letterIndex += 1
            window.setTimeout(typeWord, 90)
            return
        }

        if (!isDeleting && letterIndex === entry.text.length) {
            isDeleting = true
            window.setTimeout(typeWord, entry.final ? 1800 : 1200)
            return
        }

        if (isDeleting && letterIndex > 0) {
            letterIndex -= 1
            window.setTimeout(typeWord, 55)
            return
        }

        isDeleting = false

        const nextIndex = (entryIndex + 1) % sequence.length
        const nextEntry = sequence[nextIndex]

        const advance = () => {
            entryIndex = nextIndex
            window.setTimeout(typeWord, 250)
        }

        if (entry.final !== nextEntry.final) {
            animatePrefix(nextEntry.final ? 0 : prefixText.length, advance)
        } else {
            advance()
        }
    }

    setPrefix()
    typeWord()
}

const cardLinks = document.querySelectorAll('.card-link')

if (cardLinks.length > 0 && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cardCursor = document.createElement('div')
    cardCursor.className = 'card-cursor'
    cardCursor.setAttribute('aria-hidden', 'true')
    cardCursor.textContent = 'View Project'
    document.body.appendChild(cardCursor)

    const moveCardCursor = (event) => {
        cardCursor.style.transform = `translate(${event.clientX + 18}px, ${event.clientY + 18}px)`
    }

    for (const link of cardLinks) {
        link.addEventListener('mouseenter', (event) => {
            moveCardCursor(event)
            cardCursor.classList.add('is-visible')
        })

        link.addEventListener('mousemove', moveCardCursor)

        link.addEventListener('mouseleave', () => {
            cardCursor.classList.remove('is-visible')
        })
    }
}

const hoverLabelLinks = document.querySelectorAll('a[data-hover-label]')

if (hoverLabelLinks.length > 0 && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const hoverLabelCursor = document.createElement('div')
    hoverLabelCursor.className = 'card-cursor'
    hoverLabelCursor.setAttribute('aria-hidden', 'true')
    document.body.appendChild(hoverLabelCursor)

    const moveHoverLabelCursor = (event) => {
        hoverLabelCursor.style.transform = `translate(${event.clientX + 18}px, ${event.clientY + 18}px)`
    }

    for (const link of hoverLabelLinks) {
        link.addEventListener('mouseenter', (event) => {
            hoverLabelCursor.textContent = link.dataset.hoverLabel
            moveHoverLabelCursor(event)
            hoverLabelCursor.classList.add('is-visible')
        })

        link.addEventListener('mousemove', moveHoverLabelCursor)

        link.addEventListener('mouseleave', () => {
            hoverLabelCursor.classList.remove('is-visible')
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

const archiveCategoryButtons = document.querySelectorAll('.archive-category[data-category]')

if (archiveCategoryButtons.length > 0) {
    const archivePanels = document.querySelectorAll('.archive-panel')

    const closeAllArchivePanels = () => {
        for (const panel of archivePanels) {
            panel.classList.remove('is-open')
            panel.style.overflow = 'hidden'
            panel.style.maxHeight = ''
        }
        for (const button of archiveCategoryButtons) {
            button.setAttribute('aria-expanded', 'false')
        }
    }

    for (const button of archiveCategoryButtons) {
        button.addEventListener('click', () => {
            const wasOpen = button.getAttribute('aria-expanded') === 'true'
            const targetPanel = document.getElementById(button.getAttribute('aria-controls'))

            closeAllArchivePanels()

            if (!wasOpen && targetPanel) {
                targetPanel.classList.add('is-open')
                targetPanel.style.maxHeight = `${targetPanel.scrollHeight}px`
                button.setAttribute('aria-expanded', 'true')

                targetPanel.addEventListener('transitionend', function onOpenTransitionEnd(event) {
                    if (event.propertyName === 'max-height') {
                        targetPanel.style.overflow = 'visible'
                        targetPanel.removeEventListener('transitionend', onOpenTransitionEnd)
                    }
                })
            }
        })
    }

    window.addEventListener('resize', () => {
        const openPanel = document.querySelector('.archive-panel.is-open')
        if (openPanel) {
            openPanel.style.maxHeight = `${openPanel.scrollHeight}px`
        }
    })
}

const projectCaseStudy = document.querySelector('.project-case-study')

if (projectCaseStudy) {
    const backToTop = document.createElement('button')
    backToTop.type = 'button'
    backToTop.className = 'back-to-top'
    backToTop.setAttribute('aria-label', 'Back to top')
    backToTop.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>'
    document.body.appendChild(backToTop)

    const siteFooter = document.querySelector('.site-footer')

    const toggleBackToTop = () => {
        backToTop.classList.toggle('is-visible', window.scrollY > 400)

        if (siteFooter) {
            const footerRect = siteFooter.getBoundingClientRect()
            backToTop.classList.toggle('over-footer', footerRect.top < window.innerHeight - 28)
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    toggleBackToTop()
    window.addEventListener('scroll', toggleBackToTop, { passive: true })
    window.addEventListener('resize', toggleBackToTop)
}

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.body.classList.add('custom-cursor-enabled')

    const cursorDot = document.createElement('div')
    cursorDot.className = 'cursor-dot'
    cursorDot.setAttribute('aria-hidden', 'true')
    document.body.appendChild(cursorDot)

    let lastTrailTime = 0
    const trailInterval = 35

    document.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event
        cursorDot.style.left = `${clientX}px`
        cursorDot.style.top = `${clientY}px`

        const now = performance.now()
        if (now - lastTrailTime > trailInterval) {
            lastTrailTime = now

            const trailDot = document.createElement('div')
            trailDot.className = 'cursor-trail-dot'
            trailDot.style.left = `${clientX}px`
            trailDot.style.top = `${clientY}px`
            document.body.appendChild(trailDot)

            trailDot.addEventListener('animationend', () => {
                trailDot.remove()
            })
        }
    })
}

