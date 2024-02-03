export default function Table({ tableData }) {
  if (!(tableData && Array.isArray(tableData) && tableData?.length))
    return null;
  const headingData = tableData[0];
  debugger;
  const headings = Object.keys(headingData);
  debugger;
  return (
    <table>
      <thead>
        <tr>
          {headings.map((heading) => {
            return <th key={heading}>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => {
          return (
            <tr key={index}>
              {headings.map((key, index) => {
                return <td key={row[key]}>{row[key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
