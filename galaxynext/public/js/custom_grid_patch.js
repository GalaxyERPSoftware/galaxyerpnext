frappe.ready(function () {
    if (frappe.ui && frappe.ui.form && frappe.ui.form.GridRow) {
        console.log("✅ Custom GridRow Patch Loaded");

        // Original function ne override karo
        frappe.ui.form.GridRow.prototype.validate_columns_width = function () {
            let total_column_width = 0.0;

            this.selected_columns_for_grid.forEach((row) => {
                if (row.columns && row.columns > 0) {
                    total_column_width += cint(row.columns);
                }
            });

            if (total_column_width && total_column_width > 10) {
                // 👇 Aa jagya par tame tamaro custom message muki shako
                frappe.throw(__("⚠️ You cannot set total columns more than 10. Please adjust the width."));
            }
        };
    } else {
        console.log("❌ GridRow not found");
    }
});
