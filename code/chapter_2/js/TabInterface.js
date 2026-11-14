const tablist = document.getElementById('specs-tabs');
const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));

// Choose how keyboard navigation works:
// - 'auto'   = arrow keys activate immediately
// - 'manual' = arrow keys only move focus; Enter/Space activates
const activationMode = 'auto'; // change to 'manual' if desired

initTabs();

function initTabs() {
    const initialIndex = getInitialTabIndex();
    setActiveTab(initialIndex, { setFocus: false });

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => setActiveTab(index, { setFocus: true }));
        tab.addEventListener('keydown', (event) => onTabKeyDown(event, activationMode));
        tab.addEventListener('focus', () => {
            //In auto mode activate the tab whenever it receives focus.
            if (activationMode === 'auto') {
                setActiveTab(index, { setFocus: false }); //false: no need to call focus() again
            }
        });
    });
}

function getInitialTabIndex() {
    const selected = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
    return selected === -1 ? 0 : selected;
}

function onTabKeyDown(event, mode) {
    const currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    const { key } = event;

    // Handle manual activation keys BEFORE getNextTabIndex() causes an early return
    if (mode === 'manual' && (key === 'Enter' || key === ' ')) {
        event.preventDefault();
        setActiveTab(currentIndex, { setFocus: true });
        return;
    }

    const nextIndex = getNextTabIndex(key, currentIndex, tabs.length);
    if (nextIndex === undefined) return;

    event.preventDefault();

    //In both modes, navigation keys (arrows/home/end) move focus.
    tabs[nextIndex].focus({ preventScroll: true });
}

function getNextTabIndex(key, current, total) {
    switch (key) {
        case 'Home':
            return 0;
        case 'End':
            return total - 1;
        case 'ArrowRight':
            return (current + 1) % total;
        case 'ArrowLeft':
            return (current - 1 + total) % total;
        default:
            return undefined;
    }
}

// Selects a tab + shows its panel (optional focus).
function setActiveTab(selectedTabIndex, { setFocus = true } = {}) {
    tabs.forEach((tab, i) => {
        const selected = i === selectedTabIndex;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
    });

    if (setFocus) {
        tabs[selectedTabIndex].focus({ preventScroll: true });
    }
}
