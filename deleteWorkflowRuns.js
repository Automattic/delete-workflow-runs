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

  async function clickElement(selector) {
    const elem = await waitForElement(selector);
    elem.click();
  }

  async function deleteWorkflowRun() {
    try {
      const checkSuiteElem = document.querySelector("[id^='check_suite_']");
      const id = `#${checkSuiteElem.id}`;

      const moreSelector = `${id} > div > div.d-table-cell.v-align-middle.col-1.col-md-3.text-small > div > div.text-right > details > summary`;

      await clickElement(moreSelector);

      const deleteSelector = `${id} > div > div.d-table-cell.v-align-middle.col-1.col-md-3.text-small > div > div.text-right > details > ul > li:nth-child(2) > details > summary`;
      await clickElement(deleteSelector);

      const confirmDeleteSelector = `${id} > div > div.d-table-cell.v-align-middle.col-1.col-md-3.text-small > div > div.text-right > details > ul > li:nth-child(3) > details > details-dialog > div.Box-body.pt-0.overflow-y-auto > div > form > button`;

      await clickElement(confirmDeleteSelector);
    } catch (error) {
      console.error(error.message);
    }
  }

  deleteWorkflowRun();
})();
