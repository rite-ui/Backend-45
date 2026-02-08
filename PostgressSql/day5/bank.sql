-- Customer Table
CREATE TABLE customer(
customer_id VARCHAR PRIMARY KEY,
name VARCHAR NOT NULL,
email VARCHAR UNIQUE  NOT NULL,
dob DATE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--BRANCHES
CREATE TABLE branches(
branch_id VARCHAR PRIMARY KEY,
branch_name VARCHAR NOT NULL,
city VARCHAR NOT NULL,
ifsc_code VARCHAR UNIQUE NOT NULL
);

--ACCOUNTS
CREATE TYPE account_type_enum AS ENUM(
'savings',
'current',
'salary',
'fixed_deposit',
'recurring_deposit'
);

CREATE TABLE accounts(
account_id SERIAL PRIMARY KEY,
customer_id VARCHAR REFERENCES customer(customer_id),
branch_id VARCHAR REFERENCES branches(branch_id),
balance DECIMAL (15,2) DEFAULT 0,
account_type account_type_enum NOT NULL,
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--TRANSACTION
CREATE TYPE  txn_type_enum AS ENUM('DEBIT','CREDIT');

CREATE TYPE txn_status AS ENUM(
'pending',
'success',
'failed'
);

CREATE TABLE txn(
txn_id VARCHAR PRIMARY KEY,
acc_id SERIAL REFERENCES accounts(account_id),
txn_amt DECIMAL(15,2),
txn_type txn_type_enum NOT NULL,
status txn_status,
txn_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--LOAN
CREATE TABLE loan (
loan_id VARCHAR PRIMARY KEY,
customer_id VARCHAR REFERENCES customer(customer_id),
loan_type VARCHAR,
loan_amount DECIMAL(15,2),
interest_rate DECIMAL(5,2),
status VARCHAR
);

--LOAN
CREATE TABLE loan_payment (
loan_payment_id VARCHAR PRIMARY KEY,
loan_id VARCHAR REFERENCES loans(loan_id),
loan_installment_amt DECIMAL(15,2),
due_date DATE,
amount_due DECIMAL(15,2),
amount_paid DECIMAL(15,2)
);
