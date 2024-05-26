export const csvFileToArray = (string: string) => {
  const csvRows = string.slice().split("\n");

  const array = csvRows.reduce((result: string[] = [], currentRow: string) => {
    const values = currentRow.split(",");
    console.log(values);
    if (values.length >= 1) {
      const filteredValues = values.filter((element) => element !== "\r");
      result.push(...filteredValues);
    }

    return result;
  }, []);

  return array;
};
