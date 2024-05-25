import dayjs from "dayjs";
import dummyData from "../../mock/resultData.json";

const ResultTable = ({ data = dummyData }: { data?: any[] }) => {
  return (
    <div className="mx-[100px]">
      <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-3 px-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Key Word
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Html Urls
            </th>
            <th scope="col" className="px-6 py-3">
              Search Count
            </th>
            <th scope="col" className="px-6 py-3">
              Search Duration
            </th>
            <th scope="col" className="px-6 py-3">
              Ads words
            </th>
            <th scope="col" className="px-6 py-3">
              Url Count
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td scope="row" className="w-3 px-3 font-medium text-center">
                {index}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.key}
              </td>
              <td className="px-6 py-4">{item.status}</td>
              <td className="px-6 py-4">{item.htmlUrl}</td>
              <td className="px-6 py-4">{item.resultCount}</td>
              <td className="px-6 py-4">{item.searchDuration}</td>
              <td className="px-6 py-4">{item.adsWordsCount}</td>
              <td className="px-6 py-4">{item.urlCount}</td>
              <td className="px-6 py-4">
                {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
