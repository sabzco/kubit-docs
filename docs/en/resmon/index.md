# Resmon (Resource Monitoring)

## Definitions in this document

- Subsections of a cluster: includes node, namespace, workload, pod, and container.
- Types of resources: processor, memory, disk (including two types: SSD and HDD).
- Parameters received for each resource: varies based on different subsections of the cluster and the type of resource:

|       Resource       | Node                                                                                       | Non-Node                                     |
| :------------------: | ------------------------------------------------------------------------------------------ | -------------------------------------------- |
| Processor and Memory | Capacity - Limit - Requested - Used - Used over Request - Total Children Usage             | Limit - Requested - Used - Used over Request |
|         Disk         | Capacity - Limit - Requested - Used - Used over Request - Total Children Usage - Available | Used - Capacity - Available                  |

In other words, each parameter is available in specific resources:

|              | Disk Unbound | Disk Unbound | Processor and Memory Unbound | Processor and Memory Unbound | Description                                       |
| ------------ | ------------ | ------------ | ---------------------------- | ---------------------------- | ------------------------------------------------- |
| Capacity     | \*           | \*           | \*                           |                              |                                                   |
| Limit        | \*           | \*           |                              |                              | If it is zero or has no value, it means infinite. |
| Request      | \*           | \*           |                              |                              |                                                   |
| Used         | \*           | \*           | \*                           | \*                           |                                                   |
| Over Request | \*           | \*           |                              |                              |                                                   |
| Available    |              |              | \*                           | \*                           |                                                   |
| Allocated    |              |              | \*                           |                              |                                                   |
| Child Cap    |              |              | \*                           |                              |                                                   |
| Child Used   | \*           |              |                              |                              |                                                   |

Chart Segments: Each chart displaying resource status includes sections with different colors. Below, we see the name, color, label, and their potential presence under various conditions:

|                          | Label         | Color                | Node processor and memory | Non-node processor and memory | Node Disk | Non-node disk |
| ------------------------ | ------------- | -------------------- | ------------------------- | ----------------------------- | --------- | ------------- |
| Use without any problems | Ok            | Green                | \*                        | \*                            |           |               |
| Excess use               | Over Req      | Orange               | \*                        | \*                            |           |               |
| Improper use             | Over Lim      | Red                  | \*                        | \*                            |           |               |
| Not used                 | Not Used      | Blue                 | \*                        | \*                            | \*        |               |
| Not allocated            | Unallocated   | White                | \*                        |                               | \*        |               |
| Other                    | Other         | Gray                 | \*                        |                               | \*        |               |
| Used                     | Used          | Green - Orange - Red |                           |                               | \*        | \*            |
| Available                | Available     | White                |                           |                               |           | \*            |
| Out of reach             | Not Available | Gray                 |                           |                               |           | \*            |

Chart Indicators: Each chart represents the status of resources, including one or more indicators with different colors and values:

|                    | Processor and memory | Disk | Description                                                                  |
| ------------------ | -------------------- | ---- | ---------------------------------------------------------------------------- |
| Request indicator  | Blue                 |      | If the location of two markers is equal, only the limit marker is displayed. |
| Limit indicator    | Red                  |      | If the location of two markers is equal, only the limit marker is displayed. |
| Capacity indicator |                      | Red  |                                                                              |

## Resource Monitoring Page

Main function of the page: Display the status of resources in a cluster
Available settings:

- Cluster Selection
- Select display mode in two options: default and scaled
- Search (filter) by the names of the sub-sections of a cluster
- Select resource classification based on node or namespace

By selecting the above settings, we will achieve a specific display of resource status. Each display is a table where the rows represent the hierarchical structure of resources, and the columns represent the type of resource. In each of the different categorization modes, the hierarchical structure includes the following:

| Tree Structure Column Name             | Classification Type |
| -------------------------------------- | ------------------- |
| Node - Pod - Container                 | Node                |
| Namespace - Workload - Pod - Container | Namespace           |

Each cell of this table is a chart that displays the status of a specific resource used by a sub-section of the selected cluster, based on its received parameters, and it has a different meaning depending on the chosen display mode.

### Explanation of each table cell in the default display mode

In this display mode, all charts present in the different cells have the same length. The length of the chart varies in the different sub-sections of the cluster and is based on the type of resource:

|                      | Node     | Non-Node                          |
| -------------------- | -------- | --------------------------------- |
| Processor and Memory | Capacity | Maximum Limit and (Usage + Cache) |
| Disk                 | Capacity | Capacity                          |

Each chart consists of several segments and one or more markers. The total length of the different segments equals 100 percent of the chart length, and the length of each segment is as follows:

| Label          | Node Processor and Memory                                                | Processor and Non-Node Memory                                            | Node Disk                                                                                                                                                                                      | Non-Node Disk                                                                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ok             | Minimum Limit and (Usage minus Excess Usage) (Zero Limit means Infinite) | Minimum Limit and (Usage minus Excess Usage) (Zero Limit means Infinite) |                                                                                                                                                                                                |                                                                                                                                                                                                |
| Over Req       | Minimum Excess Usage and (Limit minus Okay)                              | Minimum Excess Usage and (Limit minus Okay)                              |                                                                                                                                                                                                |                                                                                                                                                                                                |
| Over Lim       | Usage minus Limit                                                        | Usage minus Limit                                                        |                                                                                                                                                                                                |                                                                                                                                                                                                |
| Not Used       | Limit minus Usage                                                        | Limit minus Usage                                                        | (Minimum Node Capacity and Total Capacity of Children) minus Allocated                                                                                                                         |                                                                                                                                                                                                |
| Unallocated    | Node Capacity minus Limit                                                |                                                                          | Capacity minus Children’s Capacity                                                                                                                                                             |                                                                                                                                                                                                |
| Other          | Usage minus Children’s Usage max(0, node_used - sum(child_used))         |                                                                          | Allocation minus Usage                                                                                                                                                                         |                                                                                                                                                                                                |
| Used           |                                                                          |                                                                          | Usage (the only piece of the chart that may have different colors. The color of this piece is based on its value: green if less than 85%, orange if between 85% and 95%, and red if above 95%) | Usage (the only piece of the chart that may have different colors. The color of this piece is based on its value: green if less than 85%, orange if between 85% and 95%, and red if above 95%) |
| Available      |                                                                          |                                                                          |                                                                                                                                                                                                | Available                                                                                                                                                                                      |
| Not Available  |                                                                          |                                                                          |                                                                                                                                                                                                | Capacity minus (Usage + Available)                                                                                                                                                             |
| Over Allocated | max (0, other + sum(child_used) + sum(child_not_used) - capacity)        |                                                                          |                                                                                                                                                                                                |                                                                                                                                                                                                |

The position of each marker on the chart is precisely proportional to the ratio of its value to the length of the chart. If the position of the marker exceeds the length of the chart, its indicated position is not proportional to the length of the chart, and this is also reflected in the appearance of the marker (dashed line instead of solid line). The indicated values of the marker in the processor and memory correspond to the received parameters of the request and limit, which are the same for the node and non-node. However, in the disk, the indicated value is different:

|          | Processor and Memory | Disk                       |
| -------- | -------------------- | -------------------------- |
| Node     | Request and Limit    | Total Capacity of Children |
| Non-node | Request and Limit    | Capacity                   |

### Explanation of Each Cell in the Scaled Display

In this type of display, all values, including the lengths of the chart segments and the indicated positions of the markers on the chart, are scaled based on a maximum specific to that column (type of resource). In fact, all these values are multiplied by 100 and then divided by the desired maximum to obtain the ratio of that value to the maximum length of the chart (as a percentage). The method for obtaining the maximum for each column is as follows:

|                                 | Formula                                                             | Description                                                                                                                                                                                                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Processor and Memory (Namspace) | max(max(request, used), min(max(request, used) \* 1.2, max(limit))) | First, the maximum is taken between the request and the usage of all resources in that column (the highest request or usage). This number is multiplied by 1.2, and the minimum is taken between this value and the maximum limit of that column. Then, the result of this minimum is compared with the same maximum request or usage. |
| Processor and Memory (Node)     | max(capacity)                                                       | Maximum Capacity of Resources in That Column                                                                                                                                                                                                                                                                                           |
| Disk                            | max(capacity)                                                       | Maximum Capacity of Disks in That Column (SSD or HDD)                                                                                                                                                                                                                                                                                  |

The other difference between this display method and its default representation is that some segments of the chart may be compressed here. This means that due to the selection of the maximum, the total length of the chart segments sometimes exceeds 100% of the maximum allowable length of the chart; therefore, some segments are displayed less than their actual ratio. This change in the representation of these segments is also reflected, and these segments appear as fragmented. For the markers, as long as their values do not exceed the maximum, their indicated position is accurate; if they exceed the maximum, they are presented similarly to what was stated in the default display method.

#### The rule for compressing the segments of the chart is as follows

If the total length of the chart segments is less than or equal to 100 (meaning the total values are less than or equal to the maximum), no compression occurs. If this total is greater, we start from the end of the chart and remove the segments one by one until the total length of the remaining segments is less than 100. From these last segments of the chart, we start adding back in order from the smallest until the total does not exceed 100%. The segments that remain need to be compressed. Now, we divide the necessary length to fill the chart to 100 by the number of removed segments, giving all removed segments an equal length, and we indicate their compression (inaccuracy of size ratio) with a change in representation.
