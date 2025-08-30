
frappe.ready(function () {
    // Check karo ke GridRow loaded che ke nai
    if (frappe.ui && frappe.ui.form && frappe.ui.form.GridRow) {
        console.log("✅ Custom GridRow Override Loaded");

        // Original method ne override karo
        frappe.ui.form.GridRow.prototype.validate_columns_width = function () {
            let total_column_width = 0.0;

            this.selected_columns_for_grid.forEach((row) => {
                if (row.columns && row.columns > 0) {
                    total_column_width += cint(row.columns);
                }
            });
            console.log("Total Column Width:", total_column_width);

            if (total_column_width && total_column_width > 10) {
                // 🔹 Custom message mukvo
                frappe.throw(__("🚨 Sorry! You cannot set more than 10 total column width here. Please adjust values."));
            }
        };
    }
});
// frappe.ready(function () {
//     // Check karo ke GridRow loaded che ke nai
//     if (frappe.ui && frappe.ui.form && frappe.ui.form.GridRow) {
//         console.log("✅ Custom GridRow Override Loaded");

//         // Original method ne override karo
//         frappe.ui.form.GridRow.prototype.validate_columns_width = function () {
//             let total_column_width = 0.0;

//             this.selected_columns_for_grid.forEach((row) => {
//                 if (row.columns && row.columns > 0) {
//                     total_column_width += cint(row.columns);
//                 }
//             });
//             console.log("Total Column Width:", total_column_width);

//             if (total_column_width && total_column_width > 10) {
//                 // 🔹 Custom message mukvo
//                 frappe.throw(__("🚨 Sorry! You cannot set more than 10 total column width here. Please adjust values."));
//             }
//         };
//     }
// });

