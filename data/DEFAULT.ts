import { ClientInput } from '../src';

export const clientInputs: ClientInput[] = [
  {
    redash_fraudControl_allClientsSameAccount: `
      324653
      9306440703@fam
      payment_form
      ["block_suspend_reasons:General:Underage"]
    `,
    redash_fraudControl_allClientsSameDevice: `
      301139
      b89ddd95-532d-433f-9274-104043c54514
      330515
      b89ddd95-532d-433f-9274-104043c54514
      ["block_suspend_reasons:General:Multi_Accounting"]
    `,
    retool_userInfo_mainInfo: `
      Client ID	347176
      User ID	4926600423
      Login	919818598509
      Registration date(UTC)	13:10 22/07/23
      Promocode	null
      Country	IN
      Status	Active
      Social Login	✘
      IsTest	✘
      Is Trusted	✘
      Verification status	InProgress
      Auto withdrawal score	1.0
      Auto withdrawal factors	regular_clients_same_name, regular_clients_same_phone, regular_clients_same_device, regular_clients_same_account_front, fraud_clients_same_account_front
      Client suspend score	0.5
      Client suspend factors	regular_clients_same_device
      Pay to affiliate score	1.0
      Pay to affiliate factors	no_pay
      Loyalty Level	Explorer
      Segment Group	Challenger
      MTSProfile	
      User 347176 MTS Profile
      CasinoLoyaltyProfile	
      User 548552921
      Firstname	null
      Lastname	null
      Birthdate	null
      Contact phone	919818598509
      Phone Verified	✔
      Contact email	ankitchhachhia0@gmail.com
      Email Verified	✔
      Sumsub Profile	
      User 64bbe309bcc54840dc4feb47
    `,
    retool_userInfo_statistics: `
      Sportsbook GGR	
      0 INR
      Sportsbook GGR USD	
      $0
      Casino GGR	
      6562.2 INR
      Casino GGR USD	
      $78.75
      Deposits	7000 INR
      Deposits USD	$84.00
      No. of deposits	2
      Withdrawals	0 INR
      Withdrawals USD	$0.00
      No. of withdrawals	0
      Fin Pnl	
      7000 INR
      Fin Pnl USD	
      $84
      Bookmaker fee	0
      NGR Total	6562.2 INR
      NGR Total USD	$78.75
    `,
    root: true,
    text: 'oh shit',
  },
];
