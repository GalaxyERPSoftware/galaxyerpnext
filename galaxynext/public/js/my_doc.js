frappe.ui.form.on("my doc", {
    refresh: function(frm) {
        // Override GridRow validate method only once
        if (frappe.ui.form && frappe.ui.form.GridRow && !frappe.ui.form.GridRow.prototype.__custom_patched) {
            frappe.ui.form.GridRow.prototype.__custom_patched = true; // avoid duplicate patch

            let original_validate = frappe.ui.form.GridRow.prototype.validate_columns_width;

            frappe.ui.form.GridRow.prototype.validate_columns_width = function () {
                let total_column_width = 0.0;

                if (this.selected_columns_for_grid) {
                    this.selected_columns_for_grid.forEach((row) => {
                        if (row.columns && row.columns > 0) {
                            total_column_width += cint(row.columns);
                        }
                    });
                }

                // 👇 Custom error message
                if (total_column_width && total_column_width > 10) {
                    frappe.throw(__("⚠️ You cannot set more than 10 column width in 'Testing doc'. Please adjust your table layout."));
                }

                // Call original function (if any)
                if (original_validate) {
                    return original_validate.apply(this, arguments);
                }
            }
        }
    }
});
