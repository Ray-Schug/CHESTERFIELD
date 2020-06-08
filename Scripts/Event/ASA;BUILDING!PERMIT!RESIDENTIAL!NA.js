//Add Fees//
if (AInfo["Nature of Work"] == "New Construction of Single Family Dwelling" && !feeExists("NEWCONST")){
addFee("NEWCONST","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Industrialized Building" && !feeExists("INDUSTRIAL")){
addFee("INDUSTRIAL","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Manufactured or Mobile Home on Private Property" && !feeExists("MANUFACTURED")){
addFee("MANUFACTURED","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Manufactured or Mobile Home in Mobile Home Park" && !feeExists("MHOMEPARK")){
addFee("MHOMEPARK","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Additions and other accessory structures" && !feeExists("ADDITION")){
addFee("ADDITION","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Florida rooms, attached garages, detached garages with occupiable space" && !feeExists("ACCESSORY1")){
addFee("ACCESSORY1","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Detached garages (no second floor occupiable space), double-door car shed, and finished pool house" && !feeExists("ACCESSORY2")){
addFee("ACCESSORY2","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Porch and chimney additions" && !feeExists("CHIMNEYPORCH")){
addFee("CHIMNEYPORCH","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Deck, carport, gazebo, dormers, greenhouse, unheated pool house, retaining wall, boat dock with roof" && !feeExists("ACCESSORY3")){
addFee("ACCESSORY3","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "In-ground swimming pool with barrier" && !feeExists("POOLINGROUND")){
addFee("POOLINGROUND","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Above-ground swimming pool with barrier" && !feeExists("POOLABOVE")){
addFee("POOLABOVE","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Pool barrier fences (if permitted separately from pool)" && !feeExists("POOLBARRIER")){
addFee("POOLBARRIER","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Shed 150-256 square feet, including prefab sheds on skids and pole sheds" && !feeExists("SHED")){
addFee("SHED","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Alterations, and converting deck/porch/garage to finished space" && !feeExists("ALTERATION3")){
addFee("ALTERATION3","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Renovation, alteration, conversion-resulting in change in use of square footage" && !feeExists("ALTERATION1")){
addFee("ALTERATION1","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Renovation, alteration, conversion-resulting in no change in use of square footage" && !feeExists("ALTERATION2")){
addFee("ALTERATION2","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Fire damage repair permit" && !feeExists("FIREREPAIR")){
addFee("FIREREPAIR","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Exterior renovation and storm damage repairs" && !feeExists("STORMEXTREP")){
addFee("STORMEXTREP","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Chimney relining" && !feeExists("CHIMNEY")){
addFee("CHIMNEY","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Floor joist and foundation repair" && !feeExists("FOOTING")){
addFee("FOOTING","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Elevator and wheelchair lift" && !feeExists("LIFT")){
addFee("LIFT","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Relocation (house moving)" && !feeExists("RELOCATION")){
addFee("RELOCATION","CC-BLD-RES","FINAL",1,"Y");
updateFee("STATELEVY","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "New Construction of Single Family Dwelling" && !feeExists("EESITEINSP")){
addFee("EESITEINSP","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Manufactured or Mobile Home on Private Property" && !feeExists("EESITEINSP")){
addFee("EESITEINSP","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Additions and other accessory structures" && !feeExists("EESITEINSP")){
addFee("EESITEINSP","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Florida rooms, attached garages, detached garages with occupiable space" && !feeExists("EESITEINSP")){
addFee("EESITEINSP","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Detached garages (no second floor occupiable space), double-door car shed, and finished pool house" && !feeExists("EESITEINSP")){
addFee("EESITEINSP","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Porch and chimney additions" && !feeExists("EESITEINSP")){
addFee("EESITEINSP","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "In-ground swimming pool with barrier" && !feeExists("EESITEINSP")){
addFee("EESITEINSP","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "Above-ground swimming pool with barrier" && !feeExists("EESITEINSP")){
addFee("EESITEINSP","CC-BLD-RES","FINAL",1,"Y")}

if (AInfo["Nature of Work"] == "New Construction of Single Family Dwelling" && !feeExists("PLANNING")){
addFee("PLANNING","CC-BLD-RES","FINAL",1,"Y")}