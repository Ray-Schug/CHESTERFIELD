//Used for Inspection Sequence tracking requirement
function getinsptypecount(capid,insptype)
{
var count = 0;
var insp = aa.inspection.getInspections(capid).getOutput();
for (x in insp)
{

if (insp[x].getInspectionType() == insptype)
{count++

}
}
return count;
}
