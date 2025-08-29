console.log("✅ Custom Grid Override Loaded.......k");

// === Override GridRow (validation change) ===
frappe.ui.form.GridRow = class CustomGridRow extends frappe.ui.form.GridRow {
    validate_columns_width() {
        let total_column_width = 0.0;

        this.selected_columns_for_grid.forEach((row) => {
            if (row.columns && row.columns > 0) {
                total_column_width += cint(row.columns);
            }
        });

        // 🔥 Now allow up to 15 instead of 10
        if (total_column_width && total_column_width > 15) {
            frappe.throw(__("The total column width cannot be more than 15."));
        }
    }
};

// // === Override Grid (setup_visible_columns change) ===
// frappe.ui.form.Grid = class CustomGrid extends frappe.ui.form.Grid {
//     setup_visible_columns() {
//         if (this.visible_columns && this.visible_columns.length > 0) return;

//         this.user_defined_columns = [];
//         this.setup_user_defined_columns();
//         var total_colsize = 1,
//             fields =
//                 this.user_defined_columns && this.user_defined_columns.length > 0
//                     ? this.user_defined_columns
//                     : this.editable_fields || this.docfields;

//         this.visible_columns = [];

//         for (var ci in fields) {
//             var _df = fields[ci];
//             let df =
//                 this.user_defined_columns && this.user_defined_columns.length > 0
//                     ? _df
//                     : this.fields_map[_df.fieldname];

//             if (
//                 df &&
//                 !df.hidden &&
//                 (this.editable_fields || df.in_list_view) &&
//                 ((this.frm && this.frm.get_perm(df.permlevel, "read")) || !this.frm) &&
//                 !frappe.model.layout_fields.includes(df.fieldtype)
//             ) {
//                 if (df.columns) {
//                     df.colsize = df.columns;
//                 } else {
//                     this.update_default_colsize(df);
//                 }

//                 // attach formatter
//                 if (
//                     df.fieldtype == "Link" &&
//                     !df.formatter &&
//                     df.parent &&
//                     frappe.meta.docfield_map[df.parent]
//                 ) {
//                     const docfield = frappe.meta.docfield_map[df.parent][df.fieldname];
//                     if (docfield && docfield.formatter) {
//                         df.formatter = docfield.formatter;
//                     }
//                 }

//                 total_colsize += df.colsize;

//                 // 🔥 limit increased (default 11 → now 15)
//                 if (total_colsize > 15) return false;
//                 this.visible_columns.push([df, df.colsize]);
//             }
//         }

//         // 🔥 redistribute up to 15 instead of 11
//         var passes = 0;
//         while (total_colsize < 15 && passes < 15) {
//             for (var i in this.visible_columns) {
//                 var df = this.visible_columns[i][0];
//                 var colsize = this.visible_columns[i][1];
//                 if (colsize > 1 && colsize < 15 && frappe.model.is_non_std_field(df.fieldname)) {
//                     if (
//                         passes < 3 &&
//                         ["Int", "Currency", "Float", "Check", "Percent"].indexOf(df.fieldtype) !==
//                             -1
//                     ) {
//                         continue;
//                     }

//                     this.visible_columns[i][1] += 1;
//                     total_colsize++;
//                 }

//                 if (total_colsize > 15) break;
//             }
//             passes++;
//         }
//     }
// };