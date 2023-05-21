**Abstract**

This is a revised tutorial of 2_3_time_series, it is a area chart. There is a problem in the orginal one, which is the areas were drawn on the y0 axis instead of the y1 axis.

In the revised version, I have made changes to the code responsible for drawing the area. Instead of using the line "const area = d3.area()", I have modified it to "svg.attr("d", d3.area())". Additionally, I have replaced ".y0(yScale(0))" with "y0(yScale.range()[0])".