import { useState, useMemo, useEffect, createContext, useContext } from 'react';
import DataGrid, { SelectColumn, textEditor, SelectCellFormatter, useFocusRef, Column, HeaderRendererProps} from 'react-data-grid';
import textEditorList from '../components/textEditorList';

import RoleService from '../services/RoleService'

const filterClassname = 'filter-class-name';

const rootClassname = 'root-class-name';

const toolbarClassname = 'toolbar-class-name';

const filterColumnClassName = 'filter-cell';

const filterContainerClassname = 'filter-cell filter-container';


interface Row {
    id: number;
    name: string;
    idResource: number | undefined;
}

interface Filter extends Omit<Row, 'id' | 'idResource'> {
    idResource: number | undefined;
    enabled: boolean;
}

const FilterContex = createContext<Filter | undefined>(undefined);

function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.stopPropagation();
    }
  }


// function rowKeyGetter(row) {
//     return row.id;
// }

// function getComparator(sortColumn) {
//     switch (sortColumn) {
//         case 'id':
//         case 'personalId':
//         case 'phone':
//         return (a, b) => {
//             return a[sortColumn] - b[sortColumn]
//         };
//         case 'surname':
//         case 'name':
//         case 'lastname':
//         case 'email':
//         case 'position':
//         case 'subdivision':
//         case 'organization':
//         case 'status':
//         case 'comment':
//         return (a, b) => {
//             return a[sortColumn].localeCompare(b[sortColumn]);
//         };
//         default:
//         throw new Error(`unsupported sortColumn: "${sortColumn}"`)
//     }
// }

export default function RoleTable() {
    const [rows, setRows] = useState<Row[]>([]);
    const [sortColumns, setSortColumns] = useState([]);
    const [selectedRows, setSelectedRows] = useState(() => new Set());
    const [filters, setFilters] = useState<Filter>({
        name: '',
        idResource: undefined,
        enabled: true
    })

    const retrieveUsers = async () => {
        await RoleService.getAll()
        .then((response) => {
            setRows(response.data);
            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        retrieveUsers();
    }, []);

    // const handleSetRows = async (rows:Row[], index:number[]) => {
    //     setRows(rows);
    //     const id = rows[index.indexes[0]].id;
    //     const value:Row= {
    //         id: rows[index.indexes[0]].id,
    //         personalId: rows[index.indexes[0]].personalId,
    //         surname: rows[index.indexes[0]].surname,
    //         name: rows[index.indexes[0]].name,
    //         lastname: rows[index.indexes[0]].lastname,
    //         phone: rows[index.indexes[0]].phone,
    //         email: rows[index.indexes[0]].email,
    //         position: rows[index.indexes[0]].position,
    //         subdivision: rows[index.indexes[0]].subdivision,
    //         department: rows[index.indexes[0]].department,
    //         status: rows[index.indexes[0]].status,
    //         comment: rows[index.indexes[0]].comment
    //     }
    //     await UsersService.update(id, value)
    //     .then((res) => {
    //         console.log(res.data);
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     });
    // };

    const columns = useMemo((): readonly Column<Row>[] => {
        return [
            {
                key: 'id',
                name: 'ID',
                editor: textEditor,
                headerCellClass: filterColumnClassName
            //     summaryFormatter() {
            //         return <strong>Всего</strong>
            //     }
            },
            {
                key: 'name',
                name: 'Название',
                editor: textEditor,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.name}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        name: e.target.value
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer>
                )
                // summaryFormatter({ row: Row }) {
                //     return <>{row.totalCount}</>
                // }
            },
            {
                key: 'idIS',
                name: 'ИС',
                editor: textEditor,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.name}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        name: e.target.value
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer>
                )
                // summaryFormatter({ row: Row }) {
                //     return <>{row.totalCount}</>
                // }
            },
        ]
    }, []);

    const summaryRows = useMemo(() => {
        const summaryRow = {
            id: 'total_0',
            totalCount: rows.length
        };
        return [summaryRow]
    }, [rows]);

    // const sortedRows = useMemo(() => {
    //     if (sortColumns.length === 0) return rows;

    //     return [...rows].sort((a, b) => {
    //         for (const sort of sortColumns) {
    //             const comparator = getComparator(sort.columnKey);
    //             const compResult = comparator(a, b);
    //             if (compResult !== 0) {
    //                 return sort.direction === 'ASC' ? compResult : -compResult;
    //             }
    //         }
    //         return 0;
    //     });
    // }, [rows, sortColumns]);

    const createNewRow = async () => {
        const emptyAccess = {
            id: rows.length === 0 ? 1 : rows[rows.length - 1].id + 1,
            name: '',
            idResource: undefined
        };
        console.log(rows)
        setRows([...rows, emptyAccess]);
        await RoleService.create(emptyAccess)
        .then((res) => {
            console.log(res.data);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    const filtredRows = useMemo(() => {
        return rows.filter((r) => {
            return (
                
                (filters.name ? r.name.toLowerCase().startsWith(filters.name) : true)
            )
        })
    }, [rows, filters]);

    function toggleFilters() {
        setFilters((filters) => ({
          ...filters,
          enabled: !filters.enabled
        }));
    }

    function clearFilters() {
        setFilters({
            name: '',
            idResource: undefined,
            enabled: true
        })
    }

    return (
        <div className={rootClassname}>
            <div className={toolbarClassname}>
                <button onClick={createNewRow}>Add new row</button>{' '}
                <button type="button" onClick={toggleFilters}>
                    Toggle Filters
                </button>{' '}
                <button onClick={clearFilters}>Clear filters</button>
            </div>
            <FilterContex.Provider value={filters}>
                <DataGrid
                    columns={columns}
                    rows={filtredRows}
                    className={filters.enabled ? filterContainerClassname : undefined}
                    headerRowHeight={filters.enabled ? 80 : undefined}
                    onRowsChange={setRows}
                />
            </FilterContex.Provider>
            <datalist id='surname'>
                <option key={1} value={111111}>/ уволен</option>
                <option key={3} value={33333}>/переведен</option>
            </datalist>
        </div>
    );
}

function FilterRenderer<R, SR, T extends HTMLOrSVGElement>({
    isCellSelected,
    column,
    children
}: HeaderRendererProps<R, SR> & {
    children: (args: {
        ref: React.RefObject<T>;
        tabIndex: number;
        filters: Filter;
    }) => React.ReactElement;
}) {
    const filters = useContext(FilterContex);
    const { ref, tabIndex } = useFocusRef<T>(isCellSelected);

    return (
        <>
            <div>{column.name}</div>
            {filters?.enabled && <div>{children({ref, tabIndex, filters})}</div>}
        </>
    )
}