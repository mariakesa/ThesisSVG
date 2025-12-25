import xml.etree.ElementTree as ET
import sys

INKSCAPE_NAMESPACES = {
    "http://www.inkscape.org/namespaces/inkscape",
    "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd",
}

SVG_NS = "http://www.w3.org/2000/svg"


def strip_ns(tag: str) -> str:
    if "}" in tag:
        return tag.split("}", 1)[1]
    return tag


def clean_element(elem: ET.Element):
    """Remove namespace prefixes and editor-only attributes recursively."""
    elem.tag = strip_ns(elem.tag)

    for attr in list(elem.attrib):
        if attr.startswith("{"):
            ns = attr.split("}", 1)[0][1:]
            if ns in INKSCAPE_NAMESPACES:
                del elem.attrib[attr]

    for child in list(elem):
        clean_element(child)


def extract_special_nodes(root: ET.Element):
    """Extract defs, namedview, metadata."""
    defs = None
    junk = []

    for child in list(root):
        tag = strip_ns(child.tag)
        if tag == "defs":
            defs = child
            root.remove(child)
        elif tag in ("namedview", "metadata"):
            junk.append(child)

    for j in junk:
        root.remove(j)

    return defs


def main(infile: str, outfile: str):
    tree = ET.parse(infile)
    root = tree.getroot()

    clean_element(root)
    defs = extract_special_nodes(root)

    viewbox = root.attrib.get("viewBox", "0 0 400 300")

    # Build new SVG root
    svg = ET.Element("svg", {
        "xmlns": SVG_NS,
        "viewBox": viewbox
    })

    if defs is not None:
        svg.append(defs)

    # Create canonical frame
    frame = ET.SubElement(svg, "g", {"id": "frame"})

    # Move all geometry into frame
    for child in list(root):
        frame.append(child)

    # Ensure data-layer exists INSIDE frame
    existing_data_layer = frame.find(".//*[@id='data-layer']")
    if existing_data_layer is None:
        ET.SubElement(frame, "g", {"id": "data-layer"})

    ET.ElementTree(svg).write(
        outfile,
        encoding="utf-8",
        xml_declaration=True
    )


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: clean_svg.py input.svg output.svg")
        sys.exit(1)

    main(sys.argv[1], sys.argv[2])
