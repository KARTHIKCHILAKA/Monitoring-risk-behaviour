// script.js

// Example user data (replace with your actual data)
var userData = {
    "users": [
        { "username": "JohnDoe", "NoOfDaysInQueue": 3, "riskLevel": "low", "reason": "No suspicious activity", "reviewStatus": "pending" },
        { "username": "AliceSmith", "NoOfDaysInQueue": 5, "riskLevel": "medium", "reason": "Unusual login attempts", "reviewStatus": "pending" },
        { "username": "BobJohnson", "NoOfDaysInQueue": 2, "riskLevel": "high", "reason": "Multiple failed login attempts", "reviewStatus": "pending" },
        { "username": "EvaWilliams", "NoOfDaysInQueue": 6, "riskLevel": "low", "reason": "Infrequent activity", "reviewStatus": "pending" },
        { "username": "MikeBrown", "NoOfDaysInQueue": 4, "riskLevel": "medium", "reason": "Unusual account changes", "reviewStatus": "pending" },
        { "username": "SophieDavis", "NoOfDaysInQueue": 1, "riskLevel": "high", "reason": "Account access from new location", "reviewStatus": "pending" },
        { "username": "AlexSmith", "NoOfDaysInQueue": 7, "riskLevel": "low", "reason": "Regular activity", "reviewStatus": "pending" },
        { "username": "EmmaJohnson", "NoOfDaysInQueue": 8, "riskLevel": "medium", "reason": "Frequent password changes", "reviewStatus": "pending" },
        { "username": "DanielEva", "NoOfDaysInQueue": 3, "riskLevel": "high", "reason": "Account access from multiple devices", "reviewStatus": "pending" },
        { "username": "OliviaBrown", "NoOfDaysInQueue": 5, "riskLevel": "low", "reason": "No suspicious activity", "reviewStatus": "pending" },
        { "username": "AvaSophie", "NoOfDaysInQueue": 2, "riskLevel": "medium", "reason": "Unusual login attempts", "reviewStatus": "completed" },
        { "username": "NoahEmma", "NoOfDaysInQueue": 4, "riskLevel": "low", "reason": "No suspicious activity", "reviewStatus": "completed" },
        { "username": "LiamDaniel", "NoOfDaysInQueue": 6, "riskLevel": "high", "reason": "Multiple failed login attempts", "reviewStatus": "completed" },
        { "username": "MiaOlivia", "NoOfDaysInQueue": 1, "riskLevel": "medium", "reason": "Unusual account changes", "reviewStatus": "completed" },
        { "username": "SophiaAva", "NoOfDaysInQueue": 3, "riskLevel": "low", "reason": "Regular activity", "reviewStatus": "completed" },
        { "username": "JacksonNoah", "NoOfDaysInQueue": 7, "riskLevel": "high", "reason": "Account access from new location", "reviewStatus": "completed" },
        { "username": "LoganLiam", "NoOfDaysInQueue": 5, "riskLevel": "low", "reason": "No suspicious activity", "reviewStatus": "completed" },
        { "username": "LucasEthan", "NoOfDaysInQueue": 2, "riskLevel": "medium", "reason": "Unusual login attempts", "reviewStatus": "completed" },
        { "username": "EmmaMia", "NoOfDaysInQueue": 8, "riskLevel": "high", "reason": "Frequent password changes", "reviewStatus": "completed" },
        { "username": "OliverAva", "NoOfDaysInQueue": 4, "riskLevel": "low", "reason": "No suspicious activity", "reviewStatus": "completed" },
        // Add more users as needed
    ]
};

// Function to add an event listener for the "Review User" button
function addReviewUserListener() {
    var reviewButton = document.getElementById("review-user-button");
    reviewButton.addEventListener("click", reviewUser);
}

// Function to display user data in the table
function displayUserTable(tabId, users) {
    var table = document.getElementById(tabId);
    // Clear existing table content
    table.innerHTML = "";

    // Add table headers
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Select</th><th>Risk Level</th><th>Username</th><th>No Of Days In Queue</th><th>Reason</th>";
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Add table rows with user data
    var tbody = document.createElement("tbody");
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var tr = document.createElement("tr");

        // Add checkbox to the row
        var checkboxCell = document.createElement("td");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkboxCell.appendChild(checkbox);
        tr.appendChild(checkboxCell);

        // Add other user data to the row
        tr.innerHTML += "<td><span class='risk-dot " + user.riskLevel + "-risk' data-tooltip='" + user.riskLevel.charAt(0).toUpperCase() + user.riskLevel.slice(1) + "'></span><span class='risk-level'>" + user.riskLevel.toUpperCase() + "</span></td><td>" + user.username + "</td><td>" + user.NoOfDaysInQueue + "</td><td>" + user.reason + "</td>";

        // Add an event listener to each row for user selection
        tr.addEventListener("click", function () {
            // Toggle the "selected" class for the clicked row
            this.classList.toggle("selected");
        });

        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
}


// Function to get the indices of the selected rows in the table
function getSelectedRowIndices(table) {
    var indices = [];
    var rows = table.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
        if (rows[i].classList.contains("selected")) {
            indices.push(i - 1); // Subtract 1 to get the index in the userData array
        }
    }
    return indices;
}




// Function to get the index of the selected row in the table
function getSelectedRowIndex(table) {
    var rows = table.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
        if (rows[i].classList.contains("selected")) {
            return i - 1; // Subtract 1 to get the index in the userData array
        }
    }
    return -1; // Return -1 if no row is selected
}

// Add a function for the admin to review a user and set the risk level
function reviewUser() {
    var selectedTab = document.querySelector(".tab-content:not([style*='none'])");
    var table = selectedTab.querySelector(".user-table");
    var selectedRowIndex = getSelectedRowIndex(table);

    if (selectedRowIndex !== -1) {
        var selectedUser = userData.users[selectedRowIndex];
        var selectedRiskLevel = document.getElementById("risk-level").value;

        // Update the user's risk level
        selectedUser.riskLevel = selectedRiskLevel;

        // Refresh the table
        showTab(selectedTab.id.split('-')[0]);
    } else {
        alert("Please select a user to review.");
    }
}

// Function to show the specified tab and display user data
function showTab(tabName) {
    var tabs = document.querySelectorAll(".tab-content");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }

    var selectedTab = document.getElementById(tabName + "-tab");
    selectedTab.style.display = "block";

    var users = (tabName === "pending") ? userData.users.filter(user => user.reviewStatus === "pending") : userData.users.filter(user => user.reviewStatus === "completed");

    displayUserTable(tabName + "-table", users);
}

// Function for search functionality
function searchUsers() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("user-search");
    filter = input.value.toUpperCase();

    var activeTab = document.querySelector(".tab-content:not([style*='none'])");
    table = activeTab.querySelector(".user-table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        // Change the indexing to select the appropriate column for search
        td = tr[i].getElementsByTagName("td")[2]; // Assuming the username is in the third column
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


// Function to clear the search input
function clearSearch() {
    document.getElementById("user-search").value = "";
    searchUsers(); // Call searchUsers to show all users when the search is cleared
}



// Function to delete selected users
function deleteSelectedUsers() {
    var selectedTab = document.querySelector(".tab-content:not([style*='none'])");
    var table = selectedTab.querySelector(".user-table");
    var selectedIndices = getSelectedRowIndices(table);

    if (selectedIndices.length > 0) {
        // Remove selected users from both userData and newUserData arrays
        selectedIndices.sort(function (a, b) {
            return b - a; // Sort in descending order to avoid index issues
        });

        for (var i = 0; i < selectedIndices.length; i++) {
            // Check if the selected index is within the range of userData array
            if (selectedIndices[i] < userData.users.length) {
                userData.users.splice(selectedIndices[i], 1);
            } else {
                // If not, calculate the index in the newUserData array and remove the user
                var newIndex = selectedIndices[i] - userData.users.length;
                newUserData.users.splice(newIndex, 1);
            }
        }

        // Refresh the table
        showTab(selectedTab.id.split('-')[0]);
    }
    // No need for an else block, the function will silently exit if no user is selected
}




// Add an event listener for the "Delete User" button
function addDeleteUserListener() {
    var deleteButton = document.getElementById("delete-user-button");
    deleteButton.addEventListener("click", deleteSelectedUsers);
}

// Call this function in your initial setup
addDeleteUserListener();
// Initial setup: Display the "pending" tab by default
showTab("pending");
addReviewUserListener();





// Function to open the add user modal and reset form fields
function openAddUserModal() {
    var modal = document.getElementById("add-user-modal");

    // Reset the form fields to empty values
    document.getElementById("username").value = "";
    document.getElementById("daysInQueue").value = "";
    document.getElementById("riskLevel").value = "low"; // Set default value to "low"
    document.getElementById("reason").value = "";

    modal.style.display = "block";
}


// Function to close the add user modal
function closeAddUserModal() {
    var modal = document.getElementById("add-user-modal");
    modal.style.display = "none";
}

// Function to add a new user
function addUser() {
    var username = document.getElementById("username").value;
    var daysInQueue = document.getElementById("daysInQueue").value;
    var riskLevel = document.getElementById("riskLevel").value;
    var reason = document.getElementById("reason").value;

    // Validate input if needed

    // Add the new user to the userData array
    var newUser = {
        "username": username,
        "NoOfDaysInQueue": daysInQueue,
        "riskLevel": riskLevel,
        "reason": reason,
        "reviewStatus": "pending"
    };

    userData.users.push(newUser);

    // Refresh the table
    var selectedTab = document.querySelector(".tab-content:not([style*='none'])");
    showTab(selectedTab.id.split('-')[0]);

    // Close the modal
    closeAddUserModal();
}


