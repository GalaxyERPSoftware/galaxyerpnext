frappe.ui.form.GridRow.prototype.validate_columns_width = function() {
    let total_column_width = 0.0;
    for (let row of this.doc.selected_columns_for_grid || []) {
        if (row.columns && row.columns > 0) {
            total_column_width += cint(row.columns);
        }
    }
    // ✅ default 10 hatu, ahi tame vadhaari shako (20 / 30)
    if (total_column_width && total_column_width > 20) {
        frappe.throw(__("The total column width cannot be more than 20."));
    }
};
