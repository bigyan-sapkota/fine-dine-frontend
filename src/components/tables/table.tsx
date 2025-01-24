import { Users } from "lucide-react";
import { Table as TableType } from "../../../typing";
import AddTableDialog from "../dialogs/add-table-dialog";

type TableProps = {
  table: TableType;
};

const Table = ({ table }: TableProps) => (
  <AddTableDialog mode="update" table={table}>
    <div className="relative group cursor-pointer">
      {/* Table Circle */}
      <div
        className={`
        w-32 h-32 rounded-full flex flex-col items-center justify-center
        backdrop-blur-sm bg-white/90 border-2
        ${table.available ? "border-green-400" : "border-red-400"}
        shadow-lg transition-all duration-300
        group-hover:scale-105
      `}
      >
        <span className="font-bold text-lg text-text-primary">
          {table.attribute}
        </span>
        <div className="flex items-center gap-1 text-text-secondary">
          <Users size={16} />
          <span>{table.capacity}</span>
        </div>
      </div>

      {/* Chair Circles */}
      {[...Array(table.capacity)].map((_, index) => {
        const angle = index * (360 / table.capacity) * (Math.PI / 180);
        const radius = 70; // Distance from center
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={index}
            className={`
              absolute w-8 h-8 rounded-full
              transform -translate-x-1/2 -translate-y-1/2
              backdrop-blur-sm bg-white/80 border
              ${table.available ? "border-green-300" : "border-red-300"}
              shadow-md transition-all duration-300
              group-hover:scale-110
            `}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          />
        );
      })}
    </div>
  </AddTableDialog>
);

export default Table;
