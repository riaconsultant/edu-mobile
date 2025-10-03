### School Management System: Handling Multiple Profiles for a Single User Login

In this scenario, a single user (e.g., a teacher who is also a parent) logs in with one set of credentials. The user has multiple profiles based on their roles and responsibilities:

- **Class Teacher** for Grade 5, Section B.
- **Subject Teacher** for Hindi in Grades 5, 4, and 6.
- **Parent** for the child in Grade 4, Section C.
- **Parent** for the child in Grade 2, Section A.

Each profile is treated as a distinct "view" or "mode" in the system, with its own label, associated data, and access controls. Upon login, the user can switch between profiles (e.g., via a dropdown menu), and the system's menus and access permissions dynamically change:

- **Class Teacher Profile**: Access to attendance, grading, and timetables for Grade 5 Section B only.
- **Subject Teacher Profile**: Access to subject-specific tools (e.g., assignments, assessments) for Hindi across Grades 5, 4, and 6.
- **Parent Profiles (per child)**: Separate profiles for each child, with read-only access to that child's grades, attendance, fees, and communications. Menus show child-specific dashboards.

This is achieved through a normalized database design where roles/profiles are decoupled from the core user account, allowing multiple profiles per user. Below, I'll provide:

- **Database Tables**: Updated designs to support profile labels and specific data.
- **SQL Queries**: For creating tables and fetching profiles.
- **Mind Map**: A text-based hierarchical visualization for easy understanding.

#### Database Tables

The design uses three main tables:

- `users`: Stores core login credentials (one per user).
- `user_roles`: Stores profiles (multiple per user), with a new `profile_label` field for human-readable names (e.g., "Parent - Grade 4 Child"). The `role_specific_data` JSON field holds contextual details like grades, sections, or child IDs.
- `user_sessions`: Tracks the active session and current profile (via `active_profile_id` referencing `user_role_id`), enabling dynamic menu/access changes.

##### 1. `users` Table

Stores single login details.

| Field Name      | Data Type                               | Description                      | Constraints                           |
| --------------- | --------------------------------------- | -------------------------------- | ------------------------------------- |
| `user_id`       | BIGINT                                  | Unique user ID.                  | PRIMARY KEY, AUTO_INCREMENT           |
| `username`      | VARCHAR(50)                             | Unique login name (e.g., email). | UNIQUE, NOT NULL                      |
| `password_hash` | VARCHAR(255)                            | Hashed password.                 | NOT NULL                              |
| `first_name`    | VARCHAR(50)                             | User's first name.               | NOT NULL                              |
| `last_name`     | VARCHAR(50)                             | User's last name.                | NOT NULL                              |
| `email`         | VARCHAR(100)                            | Email for notifications.         | UNIQUE, NOT NULL                      |
| `phone`         | VARCHAR(15)                             | Phone for MFA/SMS.               | NULLABLE                              |
| `mfa_enabled`   | BOOLEAN                                 | MFA status.                      | DEFAULT FALSE                         |
| `mfa_secret`    | VARCHAR(50)                             | MFA secret key.                  | NULLABLE                              |
| `last_login`    | DATETIME                                | Last login timestamp.            | NULLABLE                              |
| `status`        | ENUM('Active', 'Inactive', 'Suspended') | Account status.                  | DEFAULT 'Active'                      |
| `created_at`    | DATETIME                                | Creation timestamp.              | NOT NULL, DEFAULT CURRENT_TIMESTAMP   |
| `updated_at`    | DATETIME                                | Last update timestamp.           | NULLABLE, ON UPDATE CURRENT_TIMESTAMP |

##### 2. `user_roles` Table

Stores profiles, allowing multiple per user (e.g., two Parent profiles for two children).

| Field Name           | Data Type    | Description                                                                                                                                                                                                                                                                                            | Constraints                           |
| -------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `user_role_id`       | BIGINT       | Unique profile ID.                                                                                                                                                                                                                                                                                     | PRIMARY KEY, AUTO_INCREMENT           |
| `user_id`            | BIGINT       | Links to user.                                                                                                                                                                                                                                                                                         | FOREIGN KEY, NOT NULL                 |
| `role`               | ENUM(...)    | Role type (e.g., 'ClassTeacher', 'SubjectTeacher', 'Parent'). ENUM values: 'SuperAdmin', 'Principal', 'ClassTeacher', 'SubjectTeacher', 'Student', 'Parent', 'Accountant', 'Librarian', 'HRCoordinator', 'Counselor', 'TransportCoordinator', 'ITSupport', 'Alumni', 'ExternalAuditor', 'SchoolBoard'. | NOT NULL                              |
| `profile_label`      | VARCHAR(100) | Human-readable profile name (e.g., 'Parent - Grade 4 Child').                                                                                                                                                                                                                                          | NOT NULL                              |
| `role_specific_data` | JSON         | Profile-specific details (e.g., {"child_id": 1001, "grade": 4, "section": "C"} for a Parent).                                                                                                                                                                                                          | NULLABLE                              |
| `created_at`         | DATETIME     | Creation timestamp.                                                                                                                                                                                                                                                                                    | NOT NULL, DEFAULT CURRENT_TIMESTAMP   |
| `updated_at`         | DATETIME     | Last update timestamp.                                                                                                                                                                                                                                                                                 | NULLABLE, ON UPDATE CURRENT_TIMESTAMP |

##### 3. `user_sessions` Table

Tracks sessions and active profile for dynamic access.

| Field Name          | Data Type                              | Description                              | Constraints                           |
| ------------------- | -------------------------------------- | ---------------------------------------- | ------------------------------------- |
| `session_id`        | BIGINT                                 | Unique session ID.                       | PRIMARY KEY, AUTO_INCREMENT           |
| `user_id`           | BIGINT                                 | Links to user.                           | FOREIGN KEY, NOT NULL                 |
| `active_profile_id` | BIGINT                                 | Links to current profile (user_role_id). | FOREIGN KEY (to user_roles), NOT NULL |
| `session_token`     | VARCHAR(255)                           | Secure session token (e.g., JWT).        | NOT NULL, UNIQUE                      |
| `login_time`        | DATETIME                               | Login timestamp.                         | NOT NULL, DEFAULT CURRENT_TIMESTAMP   |
| `last_activity`     | DATETIME                               | Last activity timestamp.                 | NULLABLE, ON UPDATE CURRENT_TIMESTAMP |
| `ip_address`        | VARCHAR(45)                            | Device IP.                               | NULLABLE                              |
| `device_info`       | VARCHAR(255)                           | Device/browser info.                     | NULLABLE                              |
| `session_expiry`    | DATETIME                               | Expiry timestamp.                        | NULLABLE                              |
| `status`            | ENUM('Active', 'Expired', 'LoggedOut') | Session status.                          | DEFAULT 'Active'                      |

#### SQL Queries

Below are SQL scripts to create the tables and a query to fetch all profiles for a logged-in user. Assume MySQL/PostgreSQL compatibility.

##### Table Creation Scripts

<xaiArtifact artifact_id="4d3d98f7-4215-41ed-acd4-a86990707374" artifact_version_id="36e3b319-0e34-4508-92d7-f4ff97d6e289" title="create_users_table.sql" contentType="text/sql">
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

<xaiArtifact artifact_id="851e5102-dfb0-4bb3-9372-a260bcf05b1a" artifact_version_id="c0fe2f02-5877-436a-8a5f-9bd794a545a0" title="create_user_roles_table.sql" contentType="text/sql">
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

<xaiArtifact artifact_id="74aa9d59-ecf4-4e4e-af06-2daa7c6d64b4" artifact_version_id="4f74d4e8-c1c2-4b25-9d21-ffb83017a00d" title="create_user_sessions_table.sql" contentType="text/sql">
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

##### Query to Get All Profiles Associated with a Login

This query fetches all profiles for a user after login (e.g., to populate a profile-switching dropdown). Replace `:user_id` with the logged-in user's ID.

<xaiArtifact artifact_id="168d7a6f-8f50-4e5e-a6e7-b0872f630079" artifact_version_id="1f79aed3-95ba-407e-b761-184a629b5d80" title="get_profiles.sql" contentType="text/sql">
SELECT 
    user_role_id AS profile_id,
    profile_label,
    role,
    role_specific_data
FROM 
    user_roles
WHERE 
    user_id = :user_id
ORDER BY 
    profile_label ASC;
</xaiArtifact>

**Example Result** (for the described user, assuming user_id=1):

- profile_id: 1, profile_label: 'Class Teacher - Grade 5 Section B', role: 'ClassTeacher', role_specific_data: {"grade": 5, "section": "B"}
- profile_id: 2, profile_label: 'Hindi Subject Teacher', role: 'SubjectTeacher', role_specific_data: {"subject": "Hindi", "grades": [5, 4, 6]}
- profile_id: 3, profile_label: 'Parent - Grade 2 Section A Child', role: 'Parent', role_specific_data: {"child_id": 1002, "grade": 2, "section": "A"}
- profile_id: 4, profile_label: 'Parent - Grade 4 Section C Child', role: 'Parent', role_specific_data: {"child_id": 1001, "grade": 4, "section": "C"}

#### Mind Map for Easy Understanding

Below is a text-based mind map visualizing the structure and workflow. It shows how a single login connects to multiple profiles, with dynamic menu/access changes via sessions.

```
- User Login
  - User Table
    - Fields
      - user_id
      - username
      - password_hash
      - first_name
      - last_name
      - email
      - phone
      - mfa_enabled
      - mfa_secret
      - last_login
      - status
      - created_at
      - updated_at
    - Purpose
      Stores core user credentials and details for single login
  - Profiles (user_roles Table)
    - Fields
      - user_role_id
      - user_id
      - role (ENUM)
      - profile_label
      - role_specific_data (JSON)
      - created_at
      - updated_at
    - Purpose
      Maps user to multiple profiles (roles) with labels and specific data
    - Examples for User
      - Class Teacher - Grade 5 Section B
        Role: ClassTeacher
        Data: {"grade": 5, "section": "B"}
      - Hindi Subject Teacher
        Role: SubjectTeacher
        Data: {"subject": "Hindi", "grades": [5, 4, 6]}
      - Parent - Grade 4 Section C Child
        Role: Parent
        Data: {"child_id": 1001, "grade": 4, "section": "C"}
      - Parent - Grade 2 Section A Child
        Role: Parent
        Data: {"child_id": 1002, "grade": 2, "section": "A"}
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
      Tracks active sessions and current profile for menu/access changes
  - Workflow
    - Login
      Single credentials -> Fetch all profiles from user_roles
    - Switch Profile
      Update active_profile_id in user_sessions -> Load menu/access based on role and data
  - SQL Queries
    - Get Profiles
      SELECT user_role_id, role, profile_label, role_specific_data FROM user_roles WHERE user_id = ?
```

This design ensures secure, flexible profile management. For example, when switching to "Parent - Grade 4 Child," the system loads menus specific to that child's data using the JSON details. If you need sample insertion SQL, UI wireframes, or expansions (e.g., permissions table), let me know!
