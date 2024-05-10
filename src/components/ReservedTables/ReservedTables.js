import ReservedTableDate from "../ReservedTableDate/ReservedTableDate";
import ReservedTablesRow from "../ReservedTablesrRow/ReservedTablesRow";

const ReservedTables = () => {
  return (
    <>
      <div className="container">
        <ReservedTableDate />
        <div className="flex justify-center">
          <div className="grid grid-flow-row gap-8">
            <ReservedTablesRow />
            <ReservedTablesRow />
            <ReservedTablesRow />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservedTables;
