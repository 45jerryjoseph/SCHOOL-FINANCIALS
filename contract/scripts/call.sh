#!/bin/bash 

SIGNER= jjtrials.testnet

source ./scripts/setting.conf

# Add student
near call $SUB_ACCOUNT add_student  '{"name": "Jerry", "course": "ASR", "reg_no": "BSEC/342", "age": 34,"admyear":2003,"year":3}' --accountId $SIGNER 

# Get student
near call $SUB_ACCOUNT get_student '{"start": 0, "limit": 10}' --accountId $SIGNER
near call school.westj.testnet get_student '{"start":0, "limit":10}' --accountId jjtrials.testnet

# Delete student
near call $SUB_ACCOUNT delete_student '{"id": 2}' --accountId $SIGNER
near call school.westj.testnet delete_student '{"id":2}' --accountId jjtrials.testnet

# Add student
near call $SUB_ACCOUNT add_course  '{"identity": 2 , "name": "Computer Science"}' --accountId $SIGNER 
near call school.westj.testnet add_course '{"identity": 2 ,"name": "Computer Science"}' --accountId jjtrials.testnet

# Search student key
# near view $SUB_ACCOUNT search_in_map '{"account_id": "paul-otieno.testnet"}'

# Add to Vector
# near call $SUB_ACCOUNT add_to_vec '{"name": "Software Engineering"}' --accountId $SIGNER

# Get from vector
# near view $SUB_ACCOUNT get_from_vec '{"start": 0, "limit": 5}'

# Remove from vector
# near call $SUB_ACCOUNT remove_from_vec '{"index": 0}' --accountId $SIGNER
