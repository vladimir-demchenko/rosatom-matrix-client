import React from 'react';
import type { EditorProps } from 'react-data-grid';

function autoFocusAndSelect(input: HTMLInputElement | null) {
    input?.focus();
    input?.select();
}

function textEditorList<TRow, TSummaryRow>({row, column, onRowChange, onClose}: EditorProps<TRow, TSummaryRow>) {
    return (
        <input
            className='rdg-text-editor @layer rdg.TextEditor'
            ref={autoFocusAndSelect}
            value={row[column.key as keyof TRow] as unknown as string}
            onChange={((event) => onRowChange({...row, [column.key]: event.target.value}))}
            onBlur={() => onClose(true)}
            list={column.key}
        />
    );
}

export default textEditorList;