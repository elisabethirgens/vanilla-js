const tabButtons = document.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(event) {
    tabPanels.forEach(panel => {
        panel.hidden = true;
    });

    tabButtons.forEach(tab => {
        tab.setAttribute('aria-selected', false);
    });

    event.currentTarget.setAttribute('aria-selected', true);

    const { id } = event.currentTarget;

    const tabPanel = tabPanels.find(
        panel => panel.getAttribute('aria-labelledby') === id
    );
    tabPanel.hidden = false;
}

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));
