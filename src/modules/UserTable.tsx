import { useState, useMemo, useEffect, createContext, useContext } from 'react';
import DataGrid, { SelectColumn, textEditor, SelectCellFormatter, useFocusRef, Column, HeaderRendererProps} from 'react-data-grid';
import textEditorList from '../components/textEditorList';

import UsersService from '../services/UserService'

const filterClassname = 'filter-class-name';

const rootClassname = 'root-class-name';

const toolbarClassname = 'toolbar-class-name';

const filterColumnClassName = 'filter-cell';

const filterContainerClassname = 'filter-cell filter-container';


interface Row {
    id: number;
    personalId: number | undefined;
    surname: string;
    name: string;
    lastname: string;
    phone: number | undefined;
    email: string;
    position: string;
    subdivision: string;
    department: string;
    status: number | undefined;
    comment: string;
}

interface Filter extends Omit<Row, 'id' | 'personalId' | 'phone' | 'status'> {
    personalId: number | undefined;
    phone: number | undefined;
    status: number | undefined;
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

export default function UserTable() {
    const [rows, setRows] = useState<Row[]>([]);
    const [sortColumns, setSortColumns] = useState([]);
    const [selectedRows, setSelectedRows] = useState(() => new Set());
    const [filters, setFilters] = useState<Filter>({
        personalId: undefined,
        surname: '',
        name: '',
        lastname: '',
        phone: undefined,
        email: '',
        position: '',
        subdivision: '',
        department: '',
        status: undefined,
        comment: '',
        enabled: true
    })

    const retrieveUsers = async () => {
        await UsersService.getAll()
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
                key: 'personalId',
                name: 'Табельный',
                editor: textEditor,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.personalId}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        personalId: Number.isFinite(e.target.valueAsNumber)
                                        ? e.target.valueAsNumber
                                        : undefined
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
                key: 'surname',
                name: 'Фамилия',
                editor: textEditorList,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.surname}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        surname: e.target.value
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer>
                )
            },
            {
                key: 'name',
                name: 'Имя',
                editor: textEditorList,
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
            },
            {
                key: 'lastname',
                name: 'Отчество',
                editor: textEditorList,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.lastname}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        lastname: e.target.value
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer>
                )
            },
            {
                key: 'phone',
                name: 'Телефон',
                editor: textEditor,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.phone}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        phone: Number.isFinite(e.target.valueAsNumber)
                                        ? e.target.valueAsNumber
                                        : undefined
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer>
                )
            },
            {
                key: 'email',
                name: 'E-mail',
                editor: textEditor,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.email}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        email: e.target.value
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer>
                )
            },
            {
                key: 'position',
                name: 'Должность',
                editor: textEditor,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.position}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        position: e.target.value
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer>
                )
            },
            {
                key: 'subdivision',
                name: 'Подраздеоение',
                editor: textEditor,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.subdivision}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        subdivision: e.target.value
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer>
                )
            },
            {
                key: 'department',
                name: 'Организация',
                editor: textEditor,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.department}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        department: e.target.value
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer>
                )
            },
            {
                key: 'status',
                name: 'Статус',
                editor: textEditor,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.status}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        status: Number.isFinite(e.target.valueAsNumber)
                                        ? e.target.valueAsNumber
                                        : undefined
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer>
                )
            },
            {
                key: 'comment',
                name: 'Комментарий',
                editor: textEditor,
                headerCellClass: filterColumnClassName,
                headerRenderer: (p) => (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({ filters, ...rest}) => (
                            <input
                                {...rest}
                                className={filterClassname}
                                value={filters.comment}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        comment: e.target.value
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer>
                )
            }
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
            personalId: undefined,
            surname: '',
            name: '',
            lastname: '',
            phone: undefined,
            email: '',
            position: '',
            subdivision: '',
            department: '',
            status: undefined,
            comment: ''
        };
        console.log(rows)
        setRows([...rows, emptyAccess]);
        await UsersService.create(emptyAccess)
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
                (filters.personalId !== undefined ? r.personalId : true) &&
                (filters.surname ? r.surname.toLowerCase().startsWith(filters.surname) : true) &&
                (filters.name ? r.name.toLowerCase().startsWith(filters.name) : true) &&
                (filters.lastname ? r.lastname.toLowerCase().startsWith(filters.lastname) : true) &&
                (filters.phone !== undefined ? r.phone : true) && 
                (filters.email ? r.email.toLowerCase().startsWith(filters.email) : true) &&
                (filters.subdivision ? r.subdivision.toLowerCase().startsWith(filters.subdivision) : true) &&
                (filters.position ? r.position.toLowerCase().startsWith(filters.position) : true) &&
                (filters.department ? r.department.toLowerCase().startsWith(filters.department) : true) &&
                (filters.status !== undefined ? r.status : true) &&
                (filters.comment ? r.comment.toLowerCase().includes(filters.comment) : true)
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
            personalId: undefined,
            surname: '',
            name: '',
            lastname: '',
            phone: undefined,
            email: '',
            position: '',
            subdivision: '',
            department: '',
            status: undefined,
            comment: '',
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