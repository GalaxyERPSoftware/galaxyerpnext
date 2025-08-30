// // ✅ Override GridRow validate_columns_width
// frappe.ready(() => {
//     if (frappe.ui.form && frappe.ui.form.GridRow) {
//         frappe.ui.form.GridRow.prototype.validate_columns_width = function () {
//             let total_column_width = 0.0;

//             this.selected_columns_for_grid.forEach((row) => {
//                 if (row.columns && row.columns > 0) {
//                     total_column_width += cint(row.columns);
//                 }
//             });

//             if (total_column_width && total_column_width > 10) {
//                 frappe.throw(__("hello its error")); // 🔥 Custom error message
//             }
//         };
//         console.log("✅ GridRow.validate_columns_width overridden successfully!");
//     }
// });





// frappe.provide("frappe.ui.form");

// // 🔹 Override validate_columns_width
// frappe.ui.form.GridRow = class CustomGridRow extends frappe.ui.form.GridRow {
//     validate_columns_width() {
//         let total_column_width = 0.0;

//         this.selected_columns_for_grid.forEach((row) => {
//             if (row.columns && row.columns > 0) {
//                 total_column_width += cint(row.columns);
//             }
//         });

//         // 👇 default 10 → tamari iccha pramane
//         if (total_column_width && total_column_width > 100) {
//             frappe.throw(__("The total column width cannot be more than 100."));
//         }
//     }
// };

// console.log("✅ Custom GridRow Column Limit Applied");






// // ✅ Patch GridRow validation
// frappe.ui.form.GridRow.prototype.validate_columns_width = function () {
//     let total_column_width = 0.0;

//     this.selected_columns_for_grid.forEach((row) => {
//         if (row.columns && row.columns > 0) {
//             total_column_width += cint(row.columns);
//         }
//     });

//     // 👇 limit ne 15 (tamari ichchha pramane 20, 30 pan kari shako)
//     if (total_column_width && total_column_width > 15) {
//         frappe.throw(__("The total column width cannot be more than 15."));
//     }
// };

// // ✅ Patch Grid visible columns setup
// const _setup_visible_columns = frappe.ui.form.Grid.prototype.setup_visible_columns;
// frappe.ui.form.Grid.prototype.setup_visible_columns = function () {
//     this.max_visible_columns = 20;  // 👈 default 10 → 20

//     // original logic call karo
//     return _setup_visible_columns.call(this);
// };

// console.log("✅ Grid override loaded successfully");
 



// frappe.provide("frappe.ui.form");

// // ---- GridRow override (remove validation 10 → 999) ----
// frappe.ui.form.GridRow.prototype.validate_columns_width = function () {
//     let total_column_width = 0.0;

//     this.selected_columns_for_grid.forEach((row) => {
//         if (row.columns && row.columns > 0) {
//             total_column_width += cint(row.columns);
//         }
//     });

//     // 🔹 Default 10 ne hataavi ne limit 50 muki (tamare jetli joiye etli muki shako)
//     if (total_column_width && total_column_width > 50) {
//         frappe.throw(__("The total column width cannot be more than 50."));
//     }
// };

// // ---- Grid override (setup visible columns max limit 50) ----
// const _setup_visible_columns = frappe.ui.form.Grid.prototype.setup_visible_columns;
// frappe.ui.form.Grid.prototype.setup_visible_columns = function () {
//     this.max_visible_columns = 50;   // 🔹 default 10 → 50
//     return _setup_visible_columns.call(this);
// };

// console.log("✅ Custom Grid Override Applied (Column Limit Increased)");






// // override GridRow validation
//     frappe.ui.form.GridRow.prototype.validate_columns_width = class CustomGridRow extends frappe.ui.form.GridRow.prototype.validate_columns_width {
//         validate_columns_width() {
//             let total_column_width = 0.0;

//             this.selected_columns_for_grid.forEach((row) => {
//                 if (row.columns && row.columns > 0) {
//                     total_column_width += cint(row.columns);
//                 }
//             });

//             // 👇 limit ne 10 ni jagya e 15 (athva tamari icchha pramane)
//             if (total_column_width && total_column_width > 15) {
//                 frappe.throw(__("The total column width cannot be more than 15."));
//             }
//         }
//     };

//     // override Grid visible columns setup
//     frappe.ui.form.Grid.prototype.setup_visible_columns = class CustomGrid extends frappe.ui.form.Grid.prototype.setup_visible_columns {
//         setup_visible_columns() {
//             if (this.visible_columns && this.visible_columns.length > 0) return;

//             this.user_defined_columns = [];
//             this.setup_user_defined_columns();
//             var total_colsize = 1,
//                 fields =
//                     this.user_defined_columns && this.user_defined_columns.length > 0
//                         ? this.user_defined_columns
//                         : this.editable_fields || this.docfields;

//             this.visible_columns = [];

//             for (var ci in fields) {
//                 var _df = fields[ci];

//                 df =
//                     this.user_defined_columns && this.user_defined_columns.length > 0
//                         ? _df
//                         : this.fields_map[_df.fieldname];

//                 if (
//                     df &&
//                     !df.hidden &&
//                     (this.editable_fields || df.in_list_view) &&
//                     ((this.frm && this.frm.get_perm(df.permlevel, "read")) || !this.frm) &&
//                     !frappe.model.layout_fields.includes(df.fieldtype)
//                 ) {
//                     if (df.columns) {
//                         df.colsize = df.columns;
//                     } else {
//                         this.update_default_colsize(df);
//                     }

//                     total_colsize += df.colsize;

//                     // 👇 yaha 11 ne 21 kari do
//                     if (total_colsize > 15) return false;
//                     this.visible_columns.push([df, df.colsize]);
//                 }
//             }

//             var passes = 0;
//             while (total_colsize < 16 && passes < 17) {
//                 for (var i in this.visible_columns) {
//                     var df = this.visible_columns[i][0];
//                     var colsize = this.visible_columns[i][1];
//                     if (colsize > 1 && colsize < 16 && frappe.model.is_non_std_field(df.fieldname)) {
//                         if (
//                             passes < 3 &&
//                             ["Int", "Currency", "Float", "Check", "Percent"].indexOf(df.fieldtype) !==
//                                 -1
//                         ) {
//                             continue;
//                         }

//                         this.visible_columns[i][1] += 1;
//                         total_colsize++;
//                     }

//                     if (total_colsize > 15) break;
//                 }
//                 passes++;
//             }
//         }
//     };
