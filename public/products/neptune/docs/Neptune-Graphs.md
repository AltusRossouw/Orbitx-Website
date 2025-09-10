```markdown
# OrbitX Neptune - Graph Data for Parsing

The numerical data for all graphs in the specification sheet has been extracted and formatted for easy import into graphing applications like Excel, Google Sheets, Desmos, or MATLAB.

## 1. Light Survival Rate Curve

**Description:** Shows the idealized percentage of lights still operational over time. This is a "bathtub curve".
**X-Axis:** Time (thousands of hours)
**Y-Axis:** Light Survival (%)

**Data (CSV format):**
```csv
Time (1000 hours),Light Survival (%)
0,100
20,100
40,100
60,100
70,100
71,0
80,0
100,0
```

**Notes:** This is a simplified representation. It assumes 100% survival until the rated lifetime (L70 at 70,000 hours), after which all units fail.

---

## 2. Lumen Maintenance Curve (L70)

**Description:** Shows the decay of light output (lumen depreciation) over time. The L70 point (70% output) defines the nominal lifetime.
**X-Axis:** Time (thousands of hours)
**Y-Axis:** Lumen Output (%)

**Data (CSV format):**
```csv
Time (1000 hours),Lumen Output (%)
0,100
10,98
20,96
30,94
40,92
50,88
60,82
70,70
80,55
90,40
100,25
```

**Notes:** The L70 point at 70,000 hours (70 on the x-axis) is the official lifetime rating.

---

## 3. Light Quality Scatter Plot (CRI vs. GAI)

**Description:** Plots the product's color quality against the "Type A Lighting" quality region.
**X-Axis:** Colour Rendering Index (CRI)
**Y-Axis:** Gamut Area Index (GAI)

### 3.1. "Type A Lighting" Region Polygon

This data defines the boundary of the acceptable region. Plot these points and connect them to form a shape.

**Data (CSV format):**
```csv
CRI,GAI
80,80
80,90
100,90
100,85
90,80
80,80
```

### 3.2. Neptune Product Data Point

**Data (CSV format):**
```csv
CRI,GAI
83,96
```

**Notes:** Create a scatter plot. First, plot the polygon for the "Type A" region. Then, add a single distinct data point for the Neptune product.

---

## 4. Spectral Power Distribution (SPD)

**Description:** Shows the relative intensity of light the fixture emits across the visible spectrum.
**X-Axis:** Wavelength (nanometers)
**Y-Axis:** Relative Power (unitless)

**Data (CSV format):**
```csv
Wavelength (nm),Relative Power
360,0.00
385,0.00
410,0.05
435,0.20
460,0.75
485,1.00
510,0.90
535,0.60
560,0.80
585,0.95
610,0.75
635,0.40
660,0.15
685,0.05
710,0.02
735,0.00
```

**Notes:** This is a line chart. The peak intensity is at 485 nm (a blue-cyan wavelength).

---

## How to Use This Data

1.  **For Spreadsheets (Excel, Google Sheets):**
    *   Copy the desired CSV block.
    *   Paste it into a cell, and use the **Text to Columns** feature (under the Data menu) to split it into two columns using the comma as a delimiter.
    *   Select the data and insert a chart (Line, Scatter, etc.).

2.  **For Programming (Python, MATLAB, etc.):**
    *   The CSV blocks can be easily read using functions like `read_csv` in Python (Pandas) or `csvread` in MATLAB.

3.  **For Graphing Calculators/Web Apps:**
    *   Manually input the two columns of data into the application's data table.
```