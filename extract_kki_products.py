from pathlib import Path

import pymupdf
from PIL import Image, ImageChops


ROOT = Path(r"D:\SAG\kki")

COMMERCIAL_PDF = ROOT / "Kitchen king industry equpment 2.pdf"
GALLEY_PDF = ROOT / "GALLEY KITCHEN equpment.pdf"

OUT = ROOT / "public" / "products"


# ============================================================
# HELPERS
# ============================================================

def get_product_rectangles(page):
    """
    Get image placement rectangles from the PDF page.

    The small Kitchen King logo in the upper-left corner
    is ignored automatically.
    """

    infos = page.get_image_info(xrefs=True)

    rects = []

    for info in infos:
        rect = pymupdf.Rect(info["bbox"])

        # Ignore the recurring KKI logo in the top-left.
        if (
            rect.x0 < 170
            and rect.y0 < 170
            and rect.width < 190
            and rect.height < 190
        ):
            continue

        rects.append(rect)

    # Order:
    # top -> bottom
    # then left -> right
    rects.sort(
        key=lambda r: (
            round(r.y0 / 20),
            r.x0
        )
    )

    return rects


def trim_white_space(file_path, padding=12):
    """
    Remove unnecessary surrounding white space
    while keeping a small margin around the machine.
    """

    image = Image.open(file_path).convert("RGB")

    white = Image.new(
        "RGB",
        image.size,
        (255, 255, 255)
    )

    difference = ImageChops.difference(
        image,
        white
    ).convert("L")

    mask = difference.point(
        lambda pixel: 255 if pixel > 8 else 0
    )

    bbox = mask.getbbox()

    if not bbox:
        image.save(file_path)
        return

    left, top, right, bottom = bbox

    left = max(0, left - padding)
    top = max(0, top - padding)

    right = min(
        image.width,
        right + padding
    )

    bottom = min(
        image.height,
        bottom + padding
    )

    image = image.crop(
        (left, top, right, bottom)
    )

    image.save(
        file_path,
        "PNG",
        optimize=True
    )


def export_product(
    document,
    page_number,
    product_slot,
    output_file
):
    """
    Render only the actual product image area.

    product_slot:
      0 = first product image
      1 = second product image
      2 = third product image
    """

    page = document[page_number - 1]

    rectangles = get_product_rectangles(page)

    if product_slot >= len(rectangles):
        raise RuntimeError(
            f"Page {page_number}: "
            f"requested product slot {product_slot}, "
            f"but only {len(rectangles)} product images found."
        )

    product_rect = rectangles[product_slot]

    output_file.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    pixmap = page.get_pixmap(
        matrix=pymupdf.Matrix(2.5, 2.5),
        clip=product_rect,
        alpha=False
    )

    pixmap.save(str(output_file))

    trim_white_space(output_file)

    print(
        f"Created: {output_file}"
    )


# ============================================================
# MAIN
# ============================================================

def main():

    OUT.mkdir(
        parents=True,
        exist_ok=True
    )

    commercial = pymupdf.open(
        COMMERCIAL_PDF
    )

    galley = pymupdf.open(
        GALLEY_PDF
    )


    # ========================================================
    # COMMERCIAL CATALOGUE
    # ========================================================

    commercial_jobs = [

        # COOKING

        (
            2,
            0,
            "cooking/single-burner-gas-range.png"
        ),

        (
            3,
            0,
            "cooking/three-burner-gas-range.png"
        ),

        (
            4,
            0,
            "cooking/two-burner-gas-range.png"
        ),

        (
            5,
            0,
            "cooking/four-burner-gas-range.png"
        ),

        (
            6,
            0,
            "cooking/deep-fryer-two-tank.png"
        ),


        # STORAGE / REFRIGERATION
        # Page 14 contains three separate equipment images.

        (
            14,
            0,
            "storage/mbc-refrigerator.png"
        ),

        (
            14,
            1,
            "storage/mbf-freezer.png"
        ),

        (
            14,
            2,
            "storage/blast-freezer-mrbs-121-sa.png"
        ),


        # SHIP GALLEY

        (
            18,
            0,
            "galley/roti-machine-850.png"
        ),

        (
            20,
            0,
            "galley/roti-line-1000.png"
        ),

        (
            22,
            0,
            "galley/roti-machine-650-700.png"
        ),


        # SERVING

        (
            24,
            0,
            "serving/masala-trolley.png"
        ),


        # PREPARATION

        (
            25,
            0,
            "preparation/wet-masala-grinder.png"
        ),
    ]


    for page, slot, filename in commercial_jobs:

        export_product(
            commercial,
            page,
            slot,
            OUT / filename
        )


    # ========================================================
    # GALLEY / KITCHEN EQUIPMENT CATALOGUE
    # ========================================================

    galley_jobs = [

        # PREPARATION

        (
            2,
            0,
            "preparation/pulverizer.png"
        ),

        (
            3,
            0,
            "preparation/vegetable-cutting-machine.png"
        ),

        # BAKERY

        (
            4,
            0,
            "bakery/dough-kneading-machine.png"
        ),

        (
            5,
            0,
            "bakery/spiral-dough-mixer.png"
        ),

        # SERVING

        (
            6,
            0,
            "serving/tea-snacks-service-trolley.png"
        ),

        (
            7,
            0,
            "serving/electric-plate-warmer.png"
        ),

        # PREPARATION

        (
            8,
            0,
            "preparation/tilting-wet-grinder.png"
        ),

        (
            9,
            0,
            "preparation/potato-peeler.png"
        ),

        (
            10,
            0,
            "preparation/electric-meat-mincer.png"
        ),

        # BAKERY

        (
            11,
            0,
            "bakery/planetary-bakery-mixer.png"
        ),

        # PREPARATION

        (
            12,
            0,
            "preparation/heavy-duty-industrial-mixer.png"
        ),

        (
            13,
            0,
            "preparation/ice-crusher.png"
        ),

        # WASHING

        (
            14,
            0,
            "washing/hood-type-dishwasher.png"
        ),

        # STORAGE

        (
            16,
            0,
            "storage/four-door-vertical-refrigerator.png"
        ),

        (
            17,
            0,
            "storage/under-counter-refrigerator.png"
        ),

        # CUSTOM FABRICATION
        # Page 18 has two equipment images.

        (
            18,
            0,
            "custom/dining-table-with-seater.png"
        ),

        (
            18,
            1,
            "custom/work-table-cross-bracing.png"
        ),

        # SERVING

        (
            19,
            0,
            "serving/water-cooler.png"
        ),

        # COOKING
        # Page 20 has two separate products.

        (
            20,
            0,
            "cooking/deep-fat-fryer.png"
        ),

        (
            20,
            1,
            "cooking/sandwich-griller.png"
        ),
    ]


    for page, slot, filename in galley_jobs:

        export_product(
            galley,
            page,
            slot,
            OUT / filename
        )


    commercial.close()
    galley.close()

    print()
    print("====================================")
    print("CLEAN PRODUCT EXTRACTION COMPLETE")
    print("====================================")
    print()
    print("Output:")
    print(OUT)


if __name__ == "__main__":
    main()