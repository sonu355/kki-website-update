USE kki;

START TRANSACTION
/* ============================================================
   CATEGORY IDS
   ============================================================ */

SET @cooking = (
    SELECT id
    FROM category
    WHERE slug = 'cooking-equipment'
    LIMIT 1
);

SET @preparation = (
    SELECT id
    FROM category
    WHERE slug = 'preparation-equipment'
    LIMIT 1
);

SET @storage = (
    SELECT id
    FROM category
    WHERE slug = 'storage-equipment'
    LIMIT 1
);

SET @washing = (
    SELECT id
    FROM category
    WHERE slug = 'washing-equipment'
    LIMIT 1
);

SET @serving = (
    SELECT id
    FROM category
    WHERE slug = 'serving-equipment'
    LIMIT 1
);

SET @bakery = (
    SELECT id
    FROM category
    WHERE slug = 'bakery-equipment'
    LIMIT 1
);

SET @galley = (
    SELECT id
    FROM category
    WHERE slug = 'galley-equipment'
    LIMIT 1
);

SET @custom = (
    SELECT id
    FROM category
    WHERE slug = 'custom-fabrication'
    LIMIT 1
);


/* ============================================================
   01 - SINGLE BURNER GAS RANGE
   ============================================================ */

INSERT INTO product
(
    name,
    slug,
    categoryId,
    itemCode,
    description,
    keyFeature,
    specifications,
    image,
    featured
)
VALUES
(
    'Single Burner Gas Range',
    'single-burner-gas-range',
    @cooking,
    'SAG-H01',
    'Commercial single burner gas range designed for professional kitchen cooking applications.',
    'AISI 304 stainless steel | LPG / PNG',
    'Dimension: 24" x 24" x 34" + 4"\nBurner: G-10, 70000 BTU/Hr\nCI Grill: 16" x 16"\nMade of Stainless Steel AISI 304\nLPG / PNG compatible\nIndividual control and pilot knob\nHeavy duty cast iron top\nRemovable drip tray',
    '/products/cooking/single-burner-gas-range.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   02 - TWO BURNER GAS RANGE
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Two Burner Gas Range',
    'two-burner-gas-range',
    @cooking,
    'SAG-H02-A / SAG-H02-B',
    'Heavy-duty two burner commercial gas range designed for professional kitchen cookware.',
    'Two burner | LPG / PNG | AISI 304',
    'SAG-H02-A: 48" x 24" x 34" + 4"\nBurner: G-10, 70000 BTU/Hr\nCI Grill: 16" x 16"\nSAG-H02-B: 48" x 24" x 34" + 4"\nBurner: G-10, 40000 BTU/Hr\nCI Grill: 14" x 14"\nGas Consumption: 0.9 Kg/Hr\nAISI 304 stainless steel\nIndividual control and pilot knob\nHeavy duty cast iron top',
    '/products/cooking/two-burner-gas-range.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   03 - THREE BURNER GAS RANGE
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Three Burner Gas Range',
    'three-burner-gas-range',
    @cooking,
    'SAG-H03-A / SAG-H03-B',
    'Three burner commercial gas range designed for high-volume professional cooking.',
    'Three burner | Heavy duty cast iron',
    'Dimension: 48" x 24" x 34" + 4"\nSAG-H03-A: G-10, 70000 BTU/Hr, CI Grill 16" x 16", Gas Consumption 1.6 Kg/Hr\nSAG-H03-B: G-10, 70000 BTU/Hr, CI Grill 14" x 14", Gas Consumption 0.9 Kg/Hr\nMade of Stainless Steel AISI 304\nLPG / PNG compatible\nRemovable drip tray',
    '/products/cooking/three-burner-gas-range.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   04 - FOUR BURNER GAS RANGE
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Four Burner Gas Range',
    'four-burner-gas-range',
    @cooking,
    'SAG-H04-A / SAG-H04-B',
    'Four burner heavy-duty commercial gas range manufactured for continuous professional kitchen service.',
    'Four burner | Commercial duty',
    'SAG-H04-A: 36" x 36" x 34" + 4"\nBurner: G-9, 40000 BTU/Hr\nCI Grill: 12" x 12"\nSAG-H04-B: 30" x 30" x 34" + 4"\nBurner: G-10, 40000 BTU/Hr\nCI Grill: 10" x 10"\nGas Consumption: 0.9 Kg/Hr\nAISI 304 stainless steel',
    '/products/cooking/four-burner-gas-range.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description), 
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   05 - DEEP FRYER TWO TANK
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Deep Fryer Two Tank',
    'deep-fryer-two-tank',
    @cooking,
    'SAG-H012-A / SAG-H012-B',
    'Commercial fryer designed for fast-food, culinary and confectionery applications in hotels, canteens and institutional kitchens.',
    'Temperature controlled | 8 litre tanks',
    'SAG-H012-A: 28" x 30" x 34" + 4"\nTwin Tank: 8 Ltr each\nSAG-H012-B: 16" x 30" x 34" + 4"\nSingle Tank: 8 Ltr\nTemperature Range: +20 C to +190 C\nAuto timer and temperature controller\nBottom drain system',
    '/products/cooking/deep-fryer-two-tank.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   06 - DEEP FAT FRYER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Deep Fat Fryer',
    'deep-fat-fryer',
    @cooking,
    'SAG-DFF3-A / SAG-DFF3-B',
    'Compact commercial deep fat fryer designed for professional countertop cooking applications.',
    '2 kW / 3 kW models',
    'SAG-DFF3-A: 11" x 17" x 8"\nPower: 3.0 kW\nSAG-DFF3-B: 8" x 17" x 8"\nPower: 2.0 kW',
    '/products/cooking/deep-fat-fryer.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   07 - SANDWICH GRILLER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Sandwich Griller',
    'sandwich-griller',
    @cooking,
    'SAG-SG4-A / SAG-SG4-B',
    'Commercial single sandwich griller for professional kitchens and snack service.',
    '2 kW / 3 kW models',
    'SAG-SG4-A: 11" x 15" x 8"\nPower: 2.0 kW\nSAG-SG4-B: 14" x 17" x 8"\nPower: 3.0 kW',
    '/products/cooking/sandwich-griller.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   08 - PULVERIZER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Pulverizer',
    'pulverizer',
    @preparation,
    'SAG02-A / SAG02-B / SAG02-C / SAG02-D',
    'Stainless steel pulverizer used for grinding wet pulses, red chilies, turmeric, black pepper and gravy.',
    'Four capacity options | Stainless steel body',
    'Models: SAG02-A / SAG02-B / SAG02-C / SAG02-D\nCapacity: 10-15 / 30-35 / 55-60 / 75-80 Kg/Hr\nMotor: 1 HP / 2 HP / 3 HP / 5 HP\nVoltage: 230V / 230V / 230V / 440V\nStainless steel body\nFive different screen sizes',
    '/products/preparation/pulverizer.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   09 - VEGETABLE CUTTING MACHINE
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Vegetable Cutting Machine',
    'vegetable-cutting-machine',
    @preparation,
    'SAG06-A',
    'Machine for cutting and slicing fresh and cooked vegetables and fruits in restaurant kitchens and industrial canteens.',
    '200-250 Kg/Hr | Seven cutting discs',
    'Capacity: 200-250 Kg/Hr\nMotor: 1.0 HP (0.75 kW)\nVoltage: 230V\nStainless steel body\nHigh-speed electric motor\nSeven discs for slicing, ripple cutting, grating and stick cutting',
    '/products/preparation/vegetable-cutting-machine.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   10 - TILTING WET GRINDER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Tilting Wet Grinder',
    'tilting-wet-grinder',
    @preparation,
    'SAG02-A / SAG02-B / SAG02-C',
    'Commercial tilting wet grinder for grinding Indian spices and rava used for dosa preparation.',
    '7 / 10 / 15 Kg models',
    'Capacity: 7 / 10 / 15 Kg\nMotor: 1.0 / 1.0 / 1.5 HP\nVoltage: 230V / 230V / 230-440V\nStainless steel frame and motor housing\nDetachable granite roller assembly\nTilting system locks at approximately 100 degrees',
    '/products/preparation/tilting-wet-grinder.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   11 - POTATO PEELER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Potato Peeler',
    'potato-peeler',
    @preparation,
    'SAG05-A / SAG05-B',
    'Commercial potato peeling machine designed for restaurants and industrial canteens.',
    '10 Kg / 20 Kg capacity',
    'SAG05-A: Capacity 10 Kg, Motor 0.5 HP (0.4 kW), Voltage 230V\nSAG05-B: Capacity 20 Kg, Motor 1.0 HP (0.75 kW), Voltage 230V\nStainless steel body\nStrong emery bonding\nRunning water operation\nWaste drain outlet',
    '/products/preparation/potato-peeler.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   12 - ELECTRIC MEAT MINCER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Electric Meat Mincer',
    'electric-meat-mincer',
    @preparation,
    'SAG06-A',
    'Commercial stainless steel meat and fish mincer for restaurant kitchens and catering enterprises.',
    '200-250 Kg/Hr',
    'Capacity: 200-250 Kg/Hr\nMotor: 1.0 HP (0.75 kW)\nVoltage: 230V\nHopper Diameter: 40 mm\nIncludes screw, grater plate, two blades, 9 mm plate and 5 mm plate',
    '/products/preparation/electric-meat-mincer.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   13 - HEAVY DUTY INDUSTRIAL MIXER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Heavy Duty Industrial Mixer',
    'heavy-duty-industrial-mixer',
    @preparation,
    'SAG13',
    'Heavy-duty industrial mixer for wet and dry vegetable gravy, grain and nut grinding applications.',
    '3 Ltr / 5 Ltr models',
    'Bowl Capacity: 3.0 / 5.0 Ltr\nMotor: 1.0 HP (0.75 kW) / 1.5 HP (1.0 kW)\nVoltage: 230V\nEasy to clean\nRobust durable construction\nManual and digital control options',
    '/products/preparation/heavy-duty-industrial-mixer.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   14 - ICE CRUSHER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Ice Crusher',
    'ice-crusher',
    @preparation,
    'SAG15',
    'Commercial electric ice crusher designed for high-volume shaved ice preparation.',
    '1400 RPM | 180W',
    'Dimension: 425 x 205 x 320 mm\nHopper Diameter: 108 mm\nMotor Speed: 1400 RPM\nPower Consumption: 180W\nDrain pipe provided\nInsulated non-slip handle\nDouble shaving blades',
    '/products/preparation/ice-crusher.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   15 - WET MASALA GRINDER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Wet Masala Grinder',
    'wet-masala-grinder',
    @preparation,
    'SAG-BH07',
    'Commercial stainless steel grinder for Indian spices and rava preparation.',
    'Commercial stainless steel grinding system',
    'Made of Stainless Steel\nDesigned for commercial grinding applications\nHeavy-duty construction',
    '/products/preparation/wet-masala-grinder.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   16 - DOUGH KNEADING MACHINE
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Dough Kneading Machine',
    'dough-kneading-machine',
    @bakery,
    'SAG01-A / SAG01-B / SAG01-C / SAG01-D',
    'Commercial dough kneading machine for flour and atta preparation in restaurant kitchens and industrial canteens.',
    '10 / 15 / 20 / 30 capacity models',
    'Models: SAG01-A / SAG01-B / SAG01-C / SAG01-D\nCapacity: 10 / 15 / 20 / 30\nMotor: 1.0 / 1.0 / 1.5 / 1.5 HP\nVoltage: 230V / 230V / 230V / 440V\nStainless steel bowl and kneading shaft\nPowerful gear-driven operation',
    '/products/bakery/dough-kneading-machine.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   17 - SPIRAL DOUGH MIXER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Spiral Dough Mixer',
    'spiral-dough-mixer',
    @bakery,
    'SAG08-A / SAG08-B / SAG06-C',
    'Spiral dough mixer designed for bakeries and public catering enterprises.',
    '28 / 45 / 66 litre bowls',
    'Bowl Capacity: 28 Ltr (1 speed) / 45 Ltr (2 speed) / 66 Ltr (2 speed)\nMotor: 1.7 / 2.0 / 3.5 kW\nVoltage: 230V / 440V-3P / 440V-3P\nStainless steel spiral and bowl\nManual and digital controls available',
    '/products/bakery/spiral-dough-mixer.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   18 - PLANETARY BAKERY MIXER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Planetary Bakery Mixer',
    'planetary-bakery-mixer',
    @bakery,
    'SAG09 Series',
    'Industrial planetary mixer designed for continuous preparation of dough and other food products.',
    '7.5 to 60 litre bowl options',
    'Bowl Capacity: 7.5 / 10 / 20 / 28 / 38 / 60 Ltr\nMotor: 0.32 / 0.6 / 1.1 / 1.5 / 1.5 / 2.2 kW\nVoltage: 230V models and 440V-3P for 60 Ltr model\nStainless steel bowl\nPowerful gear drive',
    '/products/bakery/planetary-bakery-mixer.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   19 - FOUR DOOR VERTICAL REFRIGERATOR
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Four Door Vertical Refrigerator',
    'four-door-vertical-refrigerator',
    @storage,
    'SAG-1250',
    'Commercial four-door vertical refrigerator with insulated stainless steel construction.',
    '1250 Ltr | -2 C to +10 C',
    'Capacity: 1250 Ltr\nSupply Voltage: 230V / 1 Phase / 50Hz\nPower: 675W\nExternal Dimension: 1370 x 800 x 2100 mm\nOperating Temperature: -2 C to +10 C\n60 mm polyurethane insulation\nSelf-closing doors\nDigital temperature controller',
    '/products/storage/four-door-vertical-refrigerator.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   20 - UNDER COUNTER REFRIGERATOR
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Under Counter Refrigerator',
    'under-counter-refrigerator',
    @storage,
    'SAG-003A / SAG-003B',
    'Stainless steel under-counter refrigerator with forced-air circulation for rapid cooling.',
    '300 / 400 litre models',
    'SAG-003A: 60" x W x 34" + 4", Capacity 300 Ltr, Power 475W\nSAG-003B: 72" x W x 34" + 4", Capacity 400 Ltr, Power 475W\nAvailable Width: 24" / 27" / 30"\nAISI 304 internal and external panels\nOperating Temperature: -2 C to +10 C',
    '/products/storage/under-counter-refrigerator.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   21 - BLAST FREEZER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Blast Freezer',
    'blast-freezer-mrbs-121-sa',
    @storage,
    'MRBS-121-SA',
    'Commercial blast freezer designed for GN tray applications.',
    '16 x GN 1/1-40 or 12 x GN 1/1-65',
    'Dimension: 790 x 870 x 1810 mm\nCapacity: 16 x GN 1/1-40 or 12 x GN 1/1-65\nRefrigerant: R290',
    '/products/storage/blast-freezer-mrbs-121-sa.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   22 - TEA SNACKS SERVICE TROLLEY
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Tea Snacks Service Trolley',
    'tea-snacks-service-trolley',
    @serving,
    'SAG-BH07',
    'Stainless steel trolley for serving tea and snacks in industrial canteens, hospitals and plants.',
    'GN pan service trolley',
    '4 Nos GN 1/1 x 150 deep pans with lids\n2 Nos trays for tea cups\n6 Nos side napkin pockets\nFolding dustbin\nHeavy-duty swivel castors with brakes',
    '/products/serving/tea-snacks-service-trolley.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   23 - ELECTRIC PLATE WARMER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Electric Plate Warmer',
    'electric-plate-warmer',
    @serving,
    'SAG-BH09-A / SAG-BH09-B',
    'Mobile electric plate warmer designed to safely heat and hold crockery for professional food service.',
    'Single and double holder carts',
    'SAG-BH09-A: 18" x 36" x 30", Double Holder Cart\nSAG-BH09-B: 18" x 19" x 30", 50 Plate Single Holder Cart',
    '/products/serving/electric-plate-warmer.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   24 - MASALA TROLLEY
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Masala Trolley',
    'masala-trolley',
    @serving,
    'SAG-BH07',
    'Commercial stainless steel trolley for hygienic storage and handling of spices and masalas.',
    '12 GN pans with lids',
    'Made of Stainless Steel\n12 Nos stainless steel 1/6 x 150 mm GN pans with lids\nSS handle\nHeavy-duty swivel castors',
    '/products/serving/masala-trolley.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   25 - WATER COOLER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Water Cooler',
    'water-cooler',
    @serving,
    'SAG-004 Series',
    'Commercial stainless steel water cooler designed for restaurants, schools and canteens.',
    '40 to 300 litre cooling capacities',
    'SAG-004-40/80: 40 Ltr cooling, 80 Ltr storage, 430W\nSAG-004-60/120: 60 Ltr cooling, 120 Ltr storage, 680W\nSAG-004-150/150: 150 Ltr cooling, 150 Ltr storage, 1300W\nSAG-004-200/250: 200 Ltr cooling, 250 Ltr storage, 1900W\nSAG-004-300/300: 300 Ltr cooling, 300 Ltr storage, 2100W\nAISI 304 stainless steel internal and external body',
    '/products/serving/water-cooler.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   26 - HOOD TYPE DISHWASHER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Hood Type Dishwasher with Entry and Exit Table',
    'hood-type-dishwasher',
    @washing,
    'RDW4',
    'Professional hood-type dishwasher designed for dishes, glasses, cups and cutlery.',
    '500 x 500 mm rack | 2.5 L/cycle',
    'Dimension: 640 x 740 x 1480 mm\nMax Glass Height: 380 mm\nRack Size: 500 x 500 mm\nElectrical Connection: 400V / 50Hz / 3 Phase\nWater Consumption: 2.5 L/cycle\nTwo pumps\nSupports cold or hot water supply',
    '/products/washing/hood-type-dishwasher.png',
    1
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   27 - DINING TABLE WITH SEATER
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Dining Table with Seater',
    'dining-table-with-seater',
    @custom,
    'SAG-WT6-A',
    'Stainless steel dining table with integrated seating for institutional dining applications.',
    '4 / 6 / 8 seater options',
    '48" x 36" x 32": 4 seats\n72" x 36" x 32": 6 seats\n96" x 36" x 32": 8 seats',
    '/products/custom/dining-table-with-seater.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   28 - WORK TABLE WITH CROSS BRACING
   ============================================================ */

INSERT INTO product
(
    name, slug, categoryId, itemCode,
    description, keyFeature, specifications,
    image, featured
)
VALUES
(
    'Work Table with Cross Bracing',
    'work-table-cross-bracing',
    @custom,
    'SAG-WT8 Series',
    'Stainless steel commercial work table with cross bracing for professional kitchen preparation areas.',
    '36 to 72 inch sizes',
    'SAG-WT8-A: 36" x 24" x 34" + 4"\nSAG-WT8-B: 48" x 24" x 34" + 4"\nSAG-WT8-C: 60" x 24" x 34" + 4"\nSAG-WT8-D: 72" x 24" x 34" + 4"',
    '/products/custom/work-table-cross-bracing.png',
    0
)
ON DUPLICATE KEY UPDATE
    categoryId = VALUES(categoryId),
    itemCode = VALUES(itemCode),
    description = VALUES(description),
    keyFeature = VALUES(keyFeature),
    specifications = VALUES(specifications),
    image = VALUES(image),
    featured = VALUES(featured);


/* ============================================================
   COMMIT
   ============================================================ */

COMMIT;


/* ============================================================
   VERIFICATION
   ============================================================ */

SELECT COUNT(*) AS total_products
FROM product;


SELECT
    p.id,
    p.name,
    p.slug,
    p.itemCode,
    c.name AS category,
    p.image,
    p.featured
FROM product p
LEFT JOIN category c
    ON p.categoryId = c.id
ORDER BY
    c.name,
    p.name;