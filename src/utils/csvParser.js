import Papa from 'papaparse';

export const parseCSV = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
            resolve(results.data);
          },
          error: function (error) {
            reject(error);
          }
        });
      })
      .catch(error => reject(error));
  });
};
