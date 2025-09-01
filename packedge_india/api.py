import frappe

def custom_boot_session(bootinfo):
    user = frappe.session.user

    # User ni company fetch karo
    company = frappe.db.get_value(
        "User Permission",
        {"user": user, "allow": "Company"},
        "for_value"
    )

    # Mapping: company → allowed workspaces
    company_workspace_map = {
        "Packedge India": ["Packedge India"],
        "Patodia": ["Patodia"],
        "GalaxyERP": ["GalaxyERP"]
    }

    allowed_workspaces = company_workspace_map.get(company, [])

    # Bootinfo workspaces filter karo
    if hasattr(bootinfo, "allowed_workspaces"):
        bootinfo.allowed_workspaces = [
            ws for ws in bootinfo.allowed_workspaces
            if ws["name"] in allowed_workspaces
        ]