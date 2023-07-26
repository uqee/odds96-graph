import { ClientInput } from '../src';

export const clientInputs: ClientInput[] = [
  {
    redash_fraudControl: `
      307120
      e9031e56-d9b9-4bdc-acba-f5d7cb9cc229
      ["block_suspend_reasons:Fraud:Non-genuine_Documents/Registration_details"]

      336160
      e9031e56-d9b9-4bdc-acba-f5d7cb9cc229
    `,
    retool_userInfo: `
      MAIN INFO
      Client ID	347810
      User ID	5688711494
      Login	shailendrak8425@gmail.com
      Registration date(UTC)	04:06 23/07/23
      Promocode	null
      Country	IN
      Status	Suspended
      Social Login	✘
      IsTest	✘
      Is Trusted	✘
      Verification status	Required
      Auto withdrawal score	2.0
      Auto withdrawal factors	fraud_clients_same_device, regular_clients_same_device, client_kyc_status
      Client suspend score	1.5
      Client suspend factors	fraud_clients_same_device, regular_clients_same_device
      Pay to affiliate score	1.0
      Pay to affiliate factors	no_pay
      Loyalty Level	Novice
      Segment Group	New
      MTSProfile	
      User 347810 MTS Profile
      CasinoLoyaltyProfile	
      User 548716017
      Firstname	null
      Lastname	null
      Birthdate	null
      Contact phone	916264967931
      Phone Verified	✔
      Contact email	shailendrak8425@gmail.com
      Email Verified	✔
      Sumsub Profile	
      User
      STATISTICS
      Currency	INR
      Total stakes (sports)	0 INR
      Total stakes USD (sports)	$0.00
      No. of bets (sports)	0
      Unsettled sports stakes	0 INR
      Unsettled sports stakes USD	$0.00
      Sportsbook GGR	
      0 INR
      Sportsbook GGR USD	
      $0
      Casino GGR	
      0 INR
      Casino GGR USD	
      $0
      Deposits	500 INR
      Deposits USD	$6.00
      No. of deposits	1
      Withdrawals	0 INR
      Withdrawals USD	$0.00
      No. of withdrawals	0
      Fin Pnl	
      500 INR
      Fin Pnl USD	
      $6
      Bookmaker fee	0
      NGR Total	0 INR
      NGR Total USD	$0.00
      Main balance	
      Currency	INR
      Balance	500
      Balance USD	$6.00
      NGR_total	0.00
      NGR_total_USD	0.00    
    `,
    text: ``,
  },
  {
    redash_fraudControl: `
      195830
      krishnakumar
      payment_form
      ["block_suspend_reasons:Fraud:Non-genuine_Documents/Registration_details"]
      337666
      krishnakumar
      payment_form
      ["block_suspend_reasons:Fraud:Non-genuine_Documents/Registration_details"]
      195830
      krishnakumar
      kyc
      ["block_suspend_reasons:Fraud:Non-genuine_Documents/Registration_details"]

      237770
      preetikumari
      payment_form
      336160
      krishnakumar
      payment_form
      185605
      krishnakumar
      kyc
      300008
      krishnakumar
      payment_form
      77516
      krishnakumar
      kyc
      ["block_suspend_reasons:General:Duplicate"]
      206089
      krishnakumar
      payment_form
      133295
      krishnakumar
      payment_form
      ["block_suspend_reasons:General:Multi_Accounting"]
      206089
      krishnakumar
      kyc
      170568
      krishnakumar
      payment_form
      301200
      preetikumari
      payment_form
      322536
      krishnakumar
      payment_form
      182991
      krishnakumar
      payment_form
      133295
      krishnakumar
      kyc
      ["block_suspend_reasons:General:Multi_Accounting"]
      182298
      krishnakumar
      payment_form
      ["block_suspend_reasons:General:Duplicate"]
      241007
      krishnakumar
      payment_form
      238547
      krishnakumar
      payment_form
      174818
      krishnakumar
      payment_form
      185605
      krishnakumar
      payment_form
      241007
      krishnakumar
      kyc
      227249
      krishnakumar
      payment_form
      237332
      krishnakumar
      payment_form
      237770
      preetikumari
      kyc
      155491
      krishnakumar
      payment_form
    `,
    retool_userInfo: `
      MAIN INFO
      Client ID	307120
      User ID	7364777088
      Login	919329988135
      Registration date(UTC)	12:53 12/06/23
      Promocode	
      Country	IN
      Status	Blocked
      Social Login	✘
      IsTest	✘
      Is Trusted	✘
      Verification status	Rejected
      Auto withdrawal score	0.5
      Auto withdrawal factors	regular_clients_same_name, fraud_clients_same_name, name_mismatch, client_kyc_status
      Client suspend score	0.0
      Pay to affiliate score	1.0
      Pay to affiliate factors	no_pay
      Loyalty Level	Starter
      Segment Group	Starter
      MTSProfile	
      User 307120 MTS Profile
      CasinoLoyaltyProfile	
      User 539369113
      Firstname	Preeti Kumari
      Lastname	null
      Birthdate	16/07/03
      Contact phone	919329988135
      Phone Verified	✔
      Contact email	nk9391906@gmail.com
      Email Verified	✔
      Sumsub Profile	
      User 64872612735dd3137433b4ae
      STATISTICS
      Currency	INR
      Total stakes (sports)	0 INR
      Total stakes USD (sports)	$0.00
      No. of bets (sports)	0
      Unsettled sports stakes	0 INR
      Unsettled sports stakes USD	$0.00
      Sportsbook GGR	
      0 INR
      Sportsbook GGR USD	
      $0
      Casino GGR	
      1066.77 INR
      Casino GGR USD	
      $12.8
      Deposits	3000 INR
      Deposits USD	$36.00
      No. of deposits	2
      Withdrawals	1930 INR
      Withdrawals USD	$23.16
      No. of withdrawals	1
      Fin Pnl	
      1070 INR
      Fin Pnl USD	
      $12.84
      Bookmaker fee	0
      NGR Total	1030 INR
      NGR Total USD	$12.36
      Main balance	
      Currency	INR
      Balance	0
      Balance USD	$0.00
      NGR_total	1030.00
      NGR_total_USD	12.36
      block_suspend_reasons:Fraud:Non-genuine_Documents/Registration_details
    `,
    text: ``,
  },
  {
    redash_fraudControl: `
      347810
      e9031e56-d9b9-4bdc-acba-f5d7cb9cc229

      307120
      e9031e56-d9b9-4bdc-acba-f5d7cb9cc229
      ["block_suspend_reasons:Fraud:Non-genuine_Documents/Registration_details"]
    `,
    retool_userInfo: `
      MAIN INFO
      Client ID	336160
      User ID	2765931304
      Login	k0898624@gmail.com
      Registration date(UTC)	07:33 15/07/23
      Promocode	
      Country	IN
      Status	Suspended
      Social Login	✔
      IsTest	✘
      Is Trusted	✘
      Verification status	Required
      Auto withdrawal score	2.5
      Auto withdrawal factors	regular_clients_same_name, fraud_clients_same_device, fraud_clients_same_phone, fraud_clients_same_name, fraud_clients_same_account_front, client_kyc_status
      Client suspend score	1.0
      Client suspend factors	fraud_clients_same_device
      Pay to affiliate score	1.0
      Pay to affiliate factors	no_pay
      Loyalty Level	Novice
      Segment Group	New
      MTSProfile	
      User 336160 MTS Profile
      CasinoLoyaltyProfile	
      User 546823981
      Firstname	null
      Lastname	null
      Birthdate	null
      Contact phone	919329988135
      Phone Verified	✔
      Contact email	k0898624@gmail.com
      Email Verified	✔
      Sumsub Profile	
      User
      STATISTICS
      Currency	INR
      Total stakes (sports)	0 INR
      Total stakes USD (sports)	$0.00
      No. of bets (sports)	0
      Unsettled sports stakes	0 INR
      Unsettled sports stakes USD	$0.00
      Sportsbook GGR	
      0 INR
      Sportsbook GGR USD	
      $0
      Casino GGR	
      0 INR
      Casino GGR USD	
      $0
      Deposits	600 INR
      Deposits USD	$7.20
      No. of deposits	1
      Withdrawals	0 INR
      Withdrawals USD	$0.00
      No. of withdrawals	0
      Fin Pnl	
      600 INR
      Fin Pnl USD	
      $7.2
      Bookmaker fee	0
      NGR Total	-40 INR
      NGR Total USD	-$0.48
      Main balance	
      Currency	INR
      Balance	600
      Balance USD	$7.20
      NGR_total	-40.00
      NGR_total_USD	-0.48
    `,
    text: ``,
  },
];
