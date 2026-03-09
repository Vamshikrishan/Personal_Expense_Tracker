 // Initialize on page load
        window.addEventListener('load', function() {
            getTotalExpenditure();
            createTableFromJSON();
            // Set today's date as default in the date input
            document.getElementById('addExpenseExpenditureDate').valueAsDate = new Date();
        });

        function showExpenseModel() {
            $('#addExpenseModal').modal('show');
        }

        function saveExpense() {
            var dataArr = $('#addExpenseForm').serializeArray();
            console.log(dataArr);
            var expenseObject = new Object();
            var storageObjectArr = [];
            var storageObject = localStorage.getItem('expenseTracker');
            for(var i in dataArr) {
                var name = dataArr[i].name;
                var value = dataArr[i].value;
                expenseObject[name] = value;
            }
            console.log(expenseObject)
            if(storageObject != null && storageObject != undefined && storageObject != '') {
                storageObjectArr = JSON.parse(storageObject);
                storageObjectArr.push(expenseObject);
            }
            else {
                storageObjectArr.push(expenseObject);
            }
            localStorage.setItem('expenseTracker', JSON.stringify(storageObjectArr));
            createTableFromJSON();
            getTotalExpenditure();
            $('#addExpenseForm').trigger('reset');
            document.getElementById('addExpenseExpenditureDate').valueAsDate = new Date();
            $('#addExpenseModal').modal('hide');
        }

        function createTableFromJSON() {
            var storageObjectArr = [];
            var storageObject = localStorage.getItem('expenseTracker');
            var html = '';
            
            if(storageObject != null && storageObject != undefined && storageObject != '') {
                storageObjectArr = JSON.parse(storageObject);
                if(storageObjectArr && storageObjectArr.length > 0) {
                    for(let i in storageObjectArr) {
                        var data = new Date(storageObjectArr[i].addExpenseExpenditureDate);
                        var formattedAmount = parseFloat(storageObjectArr[i].addExpenseSpentAmount).toFixed(2);
                        html = html + '<tr><td>' + (parseInt(i) + 1) + '</td>' +
                        '<td>' + storageObjectArr[i].addExpenseDescription + '</td>' +
                        '<td>' + data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear() + '</td>' +
                        '<td>₹' + formattedAmount + '</td>' +
                        '</tr>';
                    }
                }
                else {
                    html = '<tr><td colspan="4" class="text-center no-data"><i class="bi bi-inbox"></i> No expenses recorded yet</td></tr>';
                }
            }
            else {
                html = '<tr><td colspan="4" class="text-center no-data"><i class="bi bi-inbox"></i> No expenses recorded yet</td></tr>';
            }
            $('#expenseTableBody').html(html);
        }

        function getTotalExpenditure() {
            var storageObjectArr = [];
            var storageObject = localStorage.getItem('expenseTracker');
            var total = 0;
            
            if(storageObject != null && storageObject != undefined && storageObject != '') {
                storageObjectArr = JSON.parse(storageObject);
                if(storageObjectArr && storageObjectArr.length > 0) {
                    for(let i in storageObjectArr) {
                        total += parseFloat(storageObjectArr[i].addExpenseSpentAmount);
                    }
                }
            }
            $('#totalSpent').html(total.toFixed(2));
        }

        function resetAllExpenses() {
            if(confirm('Are you sure you want to delete all expenses? This action cannot be undone.')) {
                localStorage.removeItem('expenseTracker');
                createTableFromJSON();
                getTotalExpenditure();
                alert('All expenses have been cleared!');
            }
        }