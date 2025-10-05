### School Management System: Menu Design Based on Profile Roles for a Single User

In this scenario, a single user has multiple profiles in the School Management System (SMS), each associated with specific roles and responsibilities:

- **Class Teacher - Grade 5 Section B**: Manages academic and administrative tasks for Grade 5, Section B.
- **Hindi Subject Teacher - Grades 5, 4, 6**: Handles Hindi subject-related tasks for multiple grades.
- **Parent - Grade 4 Section C Child**: Monitors academic progress and activities for their child in Grade 4, Section C.
- **Parent - Grade 2 Section A Child**: Monitors academic progress and activities for their child in Grade 2, Section A.

The user logs in with a single set of credentials and can switch between these profiles (e.g., via a dropdown menu). Each profile has a tailored menu with modules specific to the role and associated data, ensuring role-based access control (RBAC). Below, I define the menu structure for each profile, specifying accessible modules and their purposes, along with use case examples. Additionally, I update the database design to include a `permissions` table to enforce module access per profile, provide SQL queries to fetch profile-specific menus, and present a text-based mind map for clarity.

#### Menu Design for Each Profile

Menus are designed for a web/mobile app interface, dynamically loaded based on the active profile (`user_roles.user_role_id` from the `user_sessions.active_profile_id`). Each module is restricted to the relevant profile’s context (e.g., Parent - Grade 4 Child can only access data for that child).

##### 1. **Class Teacher - Grade 5 Section B**

**Role Description**: Manages academic and administrative tasks for Grade 5, Section B (e.g., attendance, grading for this specific class).  
 **Access Level**: Medium (class-specific read/write access).  
 **Role-Specific Data**: `{"grade": 5, "section": "B"}`.

| Menu Item            | Description                                                                      | Use Case Example                                                                              |
| -------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Attendance           | Mark and view attendance for Grade 5, Section B; send absence alerts to parents. | Teacher marks attendance for 30 students in Grade 5B, notifying parents of an absent student. |
| Gradebook            | Enter grades and feedback for assignments/exams for Grade 5, Section B.          | Teacher inputs scores for a math quiz for Grade 5B, adding comments for improvement.          |
| Homework Portal      | Assign, upload, and track homework submissions for Grade 5, Section B.           | Teacher uploads a science project PDF for Grade 5B, setting a submission deadline.            |
| Class Timetable      | View and edit the timetable for Grade 5, Section B; sync with personal calendar. | Teacher checks the weekly schedule to prepare for a double-period English class.              |
| Parent Communication | Send messages, schedule meetings, or join virtual calls with Grade 5B parents.   | Teacher schedules a Zoom call with a parent to discuss a student’s behavior.                  |
| Student Analytics    | View AI-generated performance trends for Grade 5, Section B students.            | Teacher identifies two students struggling in science, assigning extra resources.             |

   <xaiArtifact artifact_id="e412706e-c1cd-4c97-b736-3b0aa4f53a60" artifact_version_id="bece725b-34eb-47ef-8409-98cf6d3ab463" title="ClassTeacherMenu_Grade5B.md" contentType="text/markdown">
   # Class Teacher - Grade 5 Section B Menu
   - **Attendance**: Mark/view attendance, send absence alerts.
   - **Gradebook**: Enter grades, provide feedback for assignments/exams.
   - **Homework Portal**: Assign/upload homework, track submissions.
   - **Class Timetable**: View/edit class schedule, sync with calendar.
   - **Parent Communication**: Send messages, schedule meetings, virtual calls.
   - **Student Analytics**: AI-driven performance trends for class.
   </xaiArtifact>

##### 2. **Hindi Subject Teacher - Grades 5, 4, 6**

**Role Description**: Manages Hindi subject-related tasks (e.g., assignments, assessments) across Grades 5, 4, and 6.  
 **Access Level**: Medium (subject-specific read/write access for assigned grades).  
 **Role-Specific Data**: `{"subject": "Hindi", "grades": [5, 4, 6]}`.

| Menu Item         | Description                                                                  | Use Case Example                                                                        |
| ----------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Gradebook         | Enter grades and feedback for Hindi assignments/exams in Grades 5, 4, 6.     | Teacher inputs scores for a Hindi essay for Grade 4 students, adding feedback.          |
| Homework Portal   | Assign and track Hindi homework for Grades 5, 4, 6.                          | Teacher uploads a Hindi vocabulary exercise for Grade 6, tracking submissions.          |
| Subject Timetable | View Hindi class schedules across Grades 5, 4, 6.                            | Teacher checks Hindi class times for Grade 5 to prepare lesson plans.                   |
| Resource Sharing  | Upload/share Hindi study materials (e.g., PDFs, videos) for assigned grades. | Teacher shares a Hindi grammar video for Grade 4 students via the portal.               |
| Student Analytics | View AI-generated Hindi performance trends for Grades 5, 4, 6.               | Teacher notices Grade 5 students struggle with Hindi verbs, assigning targeted quizzes. |

   <xaiArtifact artifact_id="66f842e0-dcd8-4c89-9cc2-4a4771e4d1db" artifact_version_id="46a277dc-baf8-430f-90b4-5d3c2d2bd917" title="SubjectTeacherMenu_Hindi.md" contentType="text/markdown">
   # Hindi Subject Teacher - Grades 5, 4, 6 Menu
   - **Gradebook**: Enter grades, feedback for Hindi assignments/exams.
   - **Homework Portal**: Assign/track Hindi homework.
   - **Subject Timetable**: View Hindi class schedules.
   - **Resource Sharing**: Upload/share Hindi study materials.
   - **Student Analytics**: AI-driven Hindi performance trends.
   </xaiArtifact>

##### 3. **Parent - Grade 4 Section C Child**

**Role Description**: Monitors academic progress, fees, and communications for their child in Grade 4, Section C.  
 **Access Level**: Limited (read-only for child’s data; updates for contact details).  
 **Role-Specific Data**: `{"child_id": 1001, "grade": 4, "section": "C"}`.

| Menu Item              | Description                                                                         | Use Case Example                                                            |
| ---------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Child’s Dashboard      | View child’s attendance, grades, assignments, and timetable for Grade 4, Section C. | Parent checks their child’s attendance and recent Hindi quiz score.         |
| Fee Management         | View/pay invoices, check payment history, download receipts for the child.          | Parent pays the semester tuition via PayPal and downloads a receipt.        |
| Announcements          | Access school notices, event alerts, and homework updates for Grade 4, Section C.   | Parent receives a notification about a parent-teacher meeting for Grade 4C. |
| Parent-Teacher Meeting | Schedule meetings or join virtual calls with Grade 4C teachers.                     | Parent books a Zoom call to discuss their child’s math progress.            |
| Performance Analytics  | View AI-driven insights on child’s academic trends in Grade 4, Section C.           | Parent sees a report highlighting their child’s strength in science.        |
| School Bus Tracking    | Track the child’s bus in real-time via GPS.                                         | Parent confirms their child’s bus is en route home after school.            |

   <xaiArtifact artifact_id="94cf9691-dd80-4f46-a735-d8283bc806d6" artifact_version_id="480869ac-583d-430e-8661-3d78f0d6ba1b" title="ParentMenu_Grade4C.md" contentType="text/markdown">
   # Parent - Grade 4 Section C Child Menu
   - **Child’s Dashboard**: View child’s attendance, grades, assignments, timetable.
   - **Fee Management**: View/pay invoices, download receipts.
   - **Announcements**: School notices, event alerts, homework updates.
   - **Parent-Teacher Meeting**: Schedule meetings, join virtual calls.
   - **Performance Analytics**: AI-driven child academic trends.
   - **School Bus Tracking**: Real-time GPS bus tracking.
   </xaiArtifact>

##### 4. **Parent - Grade 2 Section A Child**

**Role Description**: Monitors academic progress, fees, and communications for their child in Grade 2, Section A.  
 **Access Level**: Limited (read-only for child’s data; updates for contact details).  
 **Role-Specific Data**: `{"child_id": 1002, "grade": 2, "section": "A"}`.

| Menu Item              | Description                                                                         | Use Case Example                                                        |
| ---------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Child’s Dashboard      | View child’s attendance, grades, assignments, and timetable for Grade 2, Section A. | Parent checks their child’s attendance and English worksheet score.     |
| Fee Management         | View/pay invoices, check payment history, download receipts for the child.          | Parent pays a field trip fee for their Grade 2 child via the app.       |
| Announcements          | Access school notices, event alerts, and homework updates for Grade 2, Section A.   | Parent receives a notice about a Grade 2 sports day event.              |
| Parent-Teacher Meeting | Schedule meetings or join virtual calls with Grade 2A teachers.                     | Parent schedules a meeting to discuss their child’s reading skills.     |
| Performance Analytics  | View AI-driven insights on child’s academic trends in Grade 2, Section A.           | Parent sees a report suggesting extra reading practice for their child. |
| School Bus Tracking    | Track the child’s bus in real-time via GPS.                                         | Parent tracks the bus to ensure their Grade 2 child arrives safely.     |

   <xaiArtifact artifact_id="96c1d0f3-5ec5-4267-95a4-6454eaeea305" artifact_version_id="a75e834a-fd32-48f0-8e92-009b97c61e9f" title="ParentMenu_Grade2A.md" contentType="text/markdown">
   # Parent - Grade 2 Section A Child Menu
   - **Child’s Dashboard**: View child’s attendance, grades, assignments, timetable.
   - **Fee Management**: View/pay invoices, download receipts.
   - **Announcements**: School notices, event alerts, homework updates.
   - **Parent-Teacher Meeting**: Schedule meetings, join virtual calls.
   - **Performance Analytics**: AI-driven child academic trends.
   - **School Bus Tracking**: Real-time GPS bus tracking.
   </xaiArtifact>

#### Database Tables

To support profile-based menus and access control, we use the existing `users`, `user_roles`, and `user_sessions` tables (from previous responses) and introduce a `permissions` table to map profiles to accessible modules. Below are the updated and new table definitions.

##### 1. `users` Table (Unchanged)

Stores core login credentials (one per user).

<xaiArtifact artifact_id="4d3d98f7-4215-41ed-acd4-a86990707374" artifact_version_id="560cad95-7763-4b79-aa76-c27637a37f45" title="create_users_table.sql" contentType="text/sql">
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret VARCHAR(50),
    last_login DATETIME,
    status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);
</xaiArtifact>

##### 2. `user_roles` Table (Unchanged)

Stores profiles with labels and role-specific data.

<xaiArtifact artifact_id="851e5102-dfb0-4bb3-9372-a260bcf05b1a" artifact_version_id="e4486eb4-6f71-4508-9153-322a67c4f11b" title="create_user_roles_table.sql" contentType="text/sql">
CREATE TABLE user_roles (
    user_role_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    role ENUM(
        'SuperAdmin', 'Principal', 'ClassTeacher', 'SubjectTeacher', 'Student',
        'Parent', 'Accountant', 'Librarian', 'HRCoordinator', 'Counselor',
        'TransportCoordinator', 'ITSupport', 'Alumni', 'ExternalAuditor', 'SchoolBoard'
    ) NOT NULL,
    profile_label VARCHAR(100) NOT NULL,
    role_specific_data JSON,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_role (role)
);
</xaiArtifact>

##### 3. `user_sessions` Table (Unchanged)

Tracks active sessions and current profile.

<xaiArtifact artifact_id="74aa9d59-ecf4-4e4e-af06-2daa7c6d64b4" artifact_version_id="49d27ece-220e-4b02-9661-bd5716879a6a" title="create_user_sessions_table.sql" contentType="text/sql">
CREATE TABLE user_sessions (
    session_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    active_profile_id BIGINT NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    login_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_activity DATETIME ON UPDATE CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    device_info VARCHAR(255),
    session_expiry DATETIME,
    status ENUM('Active', 'Expired', 'LoggedOut') DEFAULT 'Active',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (active_profile_id) REFERENCES user_roles(user_role_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_session_token (session_token)
);
</xaiArtifact>

##### 4. `permissions` Table (New)

Maps profiles to accessible modules, ensuring RBAC.

| Field Name      | Data Type                      | Description                                    | Constraints                 |
| --------------- | ------------------------------ | ---------------------------------------------- | --------------------------- |
| `permission_id` | BIGINT                         | Unique ID for each permission.                 | PRIMARY KEY, AUTO_INCREMENT |
| `user_role_id`  | BIGINT                         | Links to a profile in `user_roles`.            | FOREIGN KEY, NOT NULL       |
| `module`        | VARCHAR(50)                    | Module name (e.g., 'Attendance', 'Gradebook'). | NOT NULL                    |
| `access_level`  | ENUM('Read', 'Write', 'Admin') | Access level for the module.                   | NOT NULL                    |

<xaiArtifact artifact_id="55e731a5-dc32-49f5-8656-848e38d38eb5" artifact_version_id="a8007ca8-e319-4649-930e-a54540902588" title="create_permissions_table.sql" contentType="text/sql">
CREATE TABLE permissions (
    permission_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_role_id BIGINT NOT NULL,
    module VARCHAR(50) NOT NULL,
    access_level ENUM('Read', 'Write', 'Admin') NOT NULL,
    INDEX idx_user_role_id (user_role_id)
);
</xaiArtifact>

##### Sample Permissions Data

To illustrate, here’s sample data for the `permissions` table for the user’s profiles:

<xaiArtifact artifact_id="78f1cd5f-5261-4be6-8c5e-59118e6221f2" artifact_version_id="b1793ca3-8eb7-4df6-afab-09712a330a3f" title="insert_permissions.sql" contentType="text/sql">
INSERT INTO permissions (user_role_id, module, access_level) VALUES
-- Class Teacher - Grade 5 Section B (user_role_id: 1)
(1, 'Attendance', 'Write'),
(1, 'Gradebook', 'Write'),
(1, 'Homework Portal', 'Write'),
(1, 'Class Timetable', 'Write'),
(1, 'Parent Communication', 'Write'),
(1, 'Student Analytics', 'Read'),
-- Hindi Subject Teacher - Grades 5, 4, 6 (user_role_id: 2)
(2, 'Gradebook', 'Write'),
(2, 'Homework Portal', 'Write'),
(2, 'Subject Timetable', 'Read'),
(2, 'Resource Sharing', 'Write'),
(2, 'Student Analytics', 'Read'),
-- Parent - Grade 4 Section C Child (user_role_id: 3)
(3, 'Child’s Dashboard', 'Read'),
(3, 'Fee Management', 'Read'),
(3, 'Announcements', 'Read'),
(3, 'Parent-Teacher Meeting', 'Write'),
(3, 'Performance Analytics', 'Read'),
(3, 'School Bus Tracking', 'Read'),
-- Parent - Grade 2 Section A Child (user_role_id: 4)
(4, 'Child’s Dashboard', 'Read'),
(4, 'Fee Management', 'Read'),
(4, 'Announcements', 'Read'),
(4, 'Parent-Teacher Meeting', 'Write'),
(4, 'Performance Analytics', 'Read'),
(4, 'School Bus Tracking', 'Read');
</xaiArtifact>

#### SQL Query to Fetch Profile-Specific Menus

This query retrieves all accessible modules for the user’s active profile, used to dynamically load the menu after login or profile switch. Replace `:active_profile_id` with the current `user_sessions.active_profile_id`.

<xaiArtifact artifact_id="53a96445-bf55-46f5-ad69-7261bb7b2e3d" artifact_version_id="aef4788c-f82c-4bfd-8741-792a4d8244e9" title="get_profile_menu.sql" contentType="text/sql">
SELECT 
    p.module,
    p.access_level
FROM 
    permissions p
WHERE 
    p.user_role_id = :active_profile_id
ORDER BY 
    p.module ASC;
</xaiArtifact>

**Example Usage**:

- For `active_profile_id: 1` (Class Teacher - Grade 5 Section B), the query returns modules: `Attendance`, `Gradebook`, `Homework Portal`, `Class Timetable`, `Parent Communication`, `Student Analytics`.
- For `active_profile_id: 3` (Parent - Grade 4 Section C Child), it returns: `Child’s Dashboard`, `Fee Management`, `Announcements`, `Parent-Teacher Meeting`, `Performance Analytics`, `School Bus Tracking`.

#### Mind Map for Understanding

Below is a text-based mind map visualizing the structure, workflow, and menu access for the user’s profiles.

```
- School Management System
  - User Login
    - users Table
      - Fields
        - user_id
        - username (e.g., jane.doe@school.com)
        - password_hash
        - first_name (e.g., Jane)
        - last_name (e.g., Doe)
        - email
        - phone
        - mfa_enabled
        - mfa_secret
        - last_login
        - status
        - created_at
        - updated_at
      - Purpose
        Single login credentials for all profiles
  - Profiles (user_roles Table)
    - Fields
      - user_role_id
      - user_id
      - role (ENUM: ClassTeacher, SubjectTeacher, Parent, etc.)
      - profile_label
      - role_specific_data (JSON)
      - created_at
      - updated_at
    - User Profiles (user_id: 1)
      - Profile 1: Class Teacher - Grade 5 Section B
        - Role: ClassTeacher
        - Label: "Class Teacher - Grade 5 Section B"
        - Data: {"grade": 5, "section": "B"}
        - Menu
          - Attendance (Write)
          - Gradebook (Write)
          - Homework Portal (Write)
          - Class Timetable (Write)
          - Parent Communication (Write)
          - Student Analytics (Read)
      - Profile 2: Hindi Subject Teacher - Grades 5, 4, 6
        - Role: SubjectTeacher
        - Label: "Hindi Subject Teacher"
        - Data: {"subject": "Hindi", "grades": [5, 4, 6]}
        - Menu
          - Gradebook (Write)
          - Homework Portal (Write)
          - Subject Timetable (Read)
          - Resource Sharing (Write)
          - Student Analytics (Read)
      - Profile 3: Parent - Grade 4 Section C Child
        - Role: Parent
        - Label: "Parent - Grade 4 Section C Child"
        - Data: {"child_id": 1001, "grade": 4, "section": "C"}
        - Menu
          - Child’s Dashboard (Read)
          - Fee Management (Read)
          - Announcements (Read)
          - Parent-Teacher Meeting (Write)
          - Performance Analytics (Read)
          - School Bus Tracking (Read)
      - Profile 4: Parent - Grade 2 Section A Child
        - Role: Parent
        - Label: "Parent - Grade 2 Section A Child"
        - Data: {"child_id": 1002, "grade": 2, "section": "A"}
        - Menu
          - Child’s Dashboard (Read)
          - Fee Management (Read)
          - Announcements (Read)
          - Parent-Teacher Meeting (Write)
          - Performance Analytics (Read)
          - School Bus Tracking (Read)
  - Sessions (user_sessions Table)
    - Fields
      - session_id
      - user_id
      - active_profile_id (FK to user_role_id)
      - session_token
      - login_time
      - last_activity
      - ip_address
      - device_info
      - session_expiry
      - status
    - Purpose
      Tracks active profile for dynamic menu loading
  - Permissions (permissions Table)
    - Fields
      - permission_id
      - user_role_id
      - module
      - access_level (Read, Write, Admin)
    - Purpose
      Enforces RBAC for profile-specific menus
  - Workflow
    - Login
      - Authenticate via users table
      - Fetch profiles from user_roles (profile_label, role_specific_data)
      - Create session in user_sessions with default active_profile_id
    - Switch Profile
      - User selects profile from dropdown (e.g., "Parent - Grade 4 Child")
      - Update user_sessions.active_profile_id
      - Query permissions table for modules and access levels
      - Load menu based on permissions and role_specific_data
  - SQL Queries
    - Fetch Profiles
      - SELECT user_role_id, profile_label, role, role_specific_data FROM user_roles WHERE user_id = ?
    - Fetch Menu
      - SELECT module, access_level FROM permissions WHERE user_role_id = ?
```

#### Implementation Notes

- **Workflow**:
  1. **Login**: User (e.g., Jane Doe, `user_id: 1`) logs in with `username: jane.doe@school.com`. The system queries `user_roles` to fetch all profiles (e.g., profile_id: 1, 2, 3, 4).
  2. **Default Profile**: The session (`user_sessions`) sets `active_profile_id` to a default (e.g., `1` for Class Teacher). The UI loads the Class Teacher menu using the `permissions` table.
  3. **Profile Switch**: User selects “Parent - Grade 4 Section C Child” from a dropdown. The system updates `user_sessions.active_profile_id` to `3`, queries `permissions` for `user_role_id: 3`, and loads the Parent menu restricted to `child_id: 1001`.
  4. **Access Control**: Permissions ensure the user cannot access Grade 5B data in the Parent profile or Grade 2A data in the Class Teacher profile.
- **Security**:
  - JWT `session_token` includes `active_profile_id` to enforce RBAC server-side.
  - `role_specific_data` restricts data access (e.g., `child_id: 1001` for Parent - Grade 4).
  - MFA (`users.mfa_enabled`) adds security for sensitive actions (e.g., grade changes).
- **UI Design**: A dropdown in the top-right corner lists profile labels (e.g., “Class Teacher - Grade 5 Section B”). The menu refreshes dynamically based on `permissions` for the `active_profile_id`.
- **Scalability**: Supports multiple profiles per user, with JSON `role_specific_data` allowing flexible data structures (e.g., multiple grades for Subject Teacher).
- **Compliance**: GDPR/HIPAA-compliant with encrypted `password_hash`, `session_token`, and audit trails via `created_at`, `updated_at`, `last_activity`.

If you need a sample UI (e.g., HTML/React for the profile-switching dropdown), additional SQL (e.g., inserting sample user data), or a more detailed workflow for a specific profile, let me know!
