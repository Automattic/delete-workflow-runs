javascript: (() => {
  async function waitForElement(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  function getNumberOfRunsToDelete() {
    const storedNumRunsToDelete = localStorage.getItem("numRunsToDelete");
    let numberOfRunsToDelete = 10;

    if (storedNumRunsToDelete) {
      numberOfRunsToDelete = parseInt(storedNumRunsToDelete);
      if (numberOfRunsToDelete === 0) {
        localStorage.removeItem("numRunsToDelete");
      }
    } else {
      const userInput = prompt(
        "How many workflow runs would you like to delete? (Enter a number or click Cancel to keep the default of 10.)",
        "10"
      );
      if (userInput !== null) {
        numberOfRunsToDelete = parseInt(userInput);
        localStorage.setItem("numRunsToDelete", numberOfRunsToDelete);
      } else {
        numberOfRunsToDelete = 0;
      }
    }
    return numberOfRunsToDelete;
  }

  async function clickElement(selector) {
    console.log(`Clicking element with selector: ${selector}...`);
    const elem = await waitForElement(selector);
    elem.click();
  }

  function clickElementWithText(selector, text) {
    console.log(
      `Clicking element with selector: ${selector} and text: ${text}...`
    );
    const elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
      const elemText = elements[i].innerText.trim();
      if (elemText.toLowerCase() === text.toLowerCase()) {
        elements[i].click();
        break;
      }
    }
  }

  async function deleteWorkflowRun() {
    try {
      const checkSuiteElem = document.querySelector("[id^='check_suite_']");
      const id = `#${checkSuiteElem.id}`;

      const moreSelector = `${id} > div > div.d-table-cell.v-align-middle.col-1.col-md-3.text-small > div > div.text-right > details > summary`;

      await clickElement(moreSelector);

      const deleteSummarySelector = `${id} > div > div.d-table-cell.v-align-middle.col-1.col-md-3.text-small > div > div.text-right > details > ul > li > details > summary`;
      await clickElementWithText(deleteSummarySelector, "delete workflow run");

      const confirmDeleteSelector = `${id} > div > div.d-table-cell.v-align-middle.col-1.col-md-3.text-small > div > div.text-right > details > ul > li > details > details-dialog > div.Box-body.pt-0.overflow-y-auto > div > form > button`;

      await clickElement(confirmDeleteSelector);
    } catch (error) {
      console.error(error.message);
    }
  }

  deleteWorkflowRun();
})();
