aa.print("FundTransferAfter debug");

aa.print("FromPermitId1=" + aa.env.getValue("FromPermitId1"));
aa.print("FromPermitId2=" + aa.env.getValue("FromPermitId2"));
aa.print("FromPermitId3=" + aa.env.getValue("FromPermitId3"));
aa.print("CurrentUserID=" + aa.env.getValue("CurrentUserID"));
aa.print("AvailableFund=" + aa.env.getValue("AvailableFund"));


aa.print("FundTransferComment=" + aa.env.getValue("FundTransferComment"));
aa.print("FundTransferMethod=" + aa.env.getValue("FundTransferMethod"));
aa.print("ToPermitId1=" + aa.env.getValue("ToPermitId1"));
aa.print("ToPermitId2=" + aa.env.getValue("ToPermitId2"));
aa.print("ToPermitId3=" + aa.env.getValue("ToPermitId3"));
aa.print("TransferredFund=" + aa.env.getValue("TransferredFund"));


aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "FundTransferAfter successful");