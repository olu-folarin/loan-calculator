//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // hide results: moved the results display to the bottom of the calculateResult function then set the display to block so it can display after 2secs
  
  // show loader
  document.getElementById('loading').style.display = 'block';

  // calc results after 2 secs
  setTimeout(calculateResult, 2000);

  e.preventDefault();
});

function calculateResult() {
  // ui vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // principal
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) /100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  
  // monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal *x* calculatedInterest)/(x-1);

  // to cgeck the finite monthly rate
  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // show results
    document.getElementById('results').style.display = 'block';
    
    // hide loader
    document.getElementById('loading').style.display = 'none';

  } else {
  //  display an error message
    showError('please check your numbers');
  }

  // e.preventDefault();
}

// display error message
function showError(error) {
// hide results
document.getElementById('results').style.display = 'none';
    
// hide loader
document.getElementById('loading').style.display = 'none';

  const errorDiv = document.createElement('div');

  // Get elements where the error will be attached
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // add class
  errorDiv.className = 'alert alert-danger';

  // create textNode
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3secs
  setTimeout(clearError, 3000)
}

// clear error
function clearError() {
  document.querySelector('.alert').remove();
}
