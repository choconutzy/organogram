import React, { useLayoutEffect } from 'react';
import './App.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";


function App() {
  useLayoutEffect(() => {
    var root = am5.Root.new("chartdiv");
    // root.container.children.push(
    //   am5map.ZoomControl.new(root, {
    //     centerX: 20
    //   })
    // )
    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
        marginLeft: -50,
        marginRight: 20,
        paddingTop: 100
        // tooltip: am5.Tooltip.new(
        //   root, {
        //     disabled: true,
        //   }
        // ),
      })
    );
    // var zoomableContainer = root.container.children.push(
    //   am5.ZoomableContainer.new(root, {
    //     width: am5.p100,
    //     height: am5.p100,
    //     pinchZoom: true
    //   })
    // );

    // var zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
    //   target: zoomableContainer
    // }));
      // container.set("verticalScrollbar", am5.Scrollbar.new(root, {
      //   width: am5.p100,
      //   height: am5.percent(100),
      //   orientation: 'horizontal'
      // }))
    // container.hideTooltip(() => {
    // })
    let series = container.children.push(
      am5hierarchy.Tree.new(root, {
        downDepth: 1,
        initialDepth: 1,
        singleBranchOnly: false,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "id",
        orientation: 'horizontal',
        customValueField: "isCollapse",
        toggleKey: "disabled",
        paddingLeft: 70,
        paddingRight: 70,
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: "vertical"
        })
      })
    );
    // series.set("verticalScrollbar", am5.Scrollbar.new(root, {
    //   width: am5.p100,
    //   height: am5.percent(100),
    //   orientation: 'vertical',
    // }))
    // series.nodes.template.set("centerX", -50)
    // series.nodes.template.set("centerY", -10)
    // series.nodes.template?.events.on("")
    // series.hideTooltip()?.then((e) => {
    //   console.log(e,"success")
    // }).catch((err: any) => {
    //   console.log(err)
    // }).finally(() => console.log("success"))
    series.circles.template.setAll({
      radius: 60,
      toggleKey: "disabled",
      hoverOnFocus: false,
    });
    
    // series.hideTooltip()?.then((e) => {
    //   console.log(e)
    // })
    // add icon
    // series.nodes.template.setup = function(target) {
    //   var icon = target.children.push(am5.Picture.new(root, {
    //     width: 50,
    //     height: 50,
    //     centerX: am5.percent(50),
    //     centerY: am5.percent(50),
    //     src: "https://assets.codepen.io/t-160/star.svg"
    //   }));
    // }
    // Hide circles
    series.set(
      "tooltip",
      am5.Tooltip.new(root, {
        forceHidden: true,
      })
    );
    // Generate and set data
    var testData = [
        { 
          id: 'PETSU1',
          name: 'Subsidiary',
          isCollapse: true,
          value: 2,
          children: [
            {
              id: 'PETSUHA',
              name: 'PT A',
              isCollapse: true,
              children: [
                {
                  id: 'PETSU12',
                  name: 'Subsidiary',
                  isCollapse: true,
                  value: 2,
                  children: {
                    id: 'PETSU1HIR',
                    name: 'Subsidiary',
                    isCollapse: true,
                    value: 2,
                    },
                },
                {
                  id: 'PETSCF2',
                  name: 'SCF',
                  isCollapse: true,
                  value: 2,
                  children: [
                    {
                    id: 'PETSU1WAAA',
                    name: 'SCF2',
                    isCollapse: true,
                    value: 2,
                    }
                  ],
                },
              ],
            },                                    
            {
              id: 'PETSU1HI',
              name: 'PT B',
              isCollapse: true,
              value: 2,
            },
          ]
        },                            
        { 
          id: 'PETSC1',
          name: 'SCF', 
          isCollapse: true,
          value: 2,
          children: [
            {
              id: 'PETSC1HU',
              name: 'PT C',
              isCollapse: true,
              value: 2,
            },
          ]
        },                            
        { 
          id: 'PETCO1',
          name: 'Consumer', 
          isCollapse: true,
          value: 2,
          children: [
            {
              id: 'PETCO1HE',
              name: 'PT D', 
              isCollapse: true,
              value: 2,
            },
          ]
        },
    ];
    var initData = [
      {
          id: 'PETSU1',
          name: 'Subsidiary',
          value: 2,
          isCollapse: true,
      },            
      { 
          id:'PETSC1',
          name: 'SCF',
          value: 1,
          isCollapse: true,
      },                            
      { 
          id:'PETCO1',
          name: 'Consumer',
          value: 1,
          isCollapse: true,
      },
    ]
    let data = {
      id: 'IPBOS',
      name: "PT Inspirasi Pertanian Bogor",
      value: 3,
      isCollapse: true,
      children: initData
    }
    const database = [{
      ...data, 
      children: testData
    }]
    function findNode(id: string) {
      return series.nodes.values.find(function(node: any) {
        return node.dataItem.get("id") === id;
      })
    }
    
    function findLevelById(node:any, id:any, currentLevel = 1) {
      // Check if the current node's name matches the target name
      if (node.id === id) {
        return currentLevel;
      }
    
      // If the node has children, recursively search in its children
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          var childLevel:any = findLevelById(node.children[i], id, currentLevel + 1);
          // If the child level is found, return it
          if (childLevel) {
            return childLevel;
          }
        }
      }
      // Return null if the name is not found in the current subtree
      return null;
    }
    function findObjectById(data:any[]=[...database],targetId:string) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === targetId) {
          return data[i]; // Found the object with the specified ID
        } else if (data[i].children && data[i].children.length > 0) {
          // Recursively search for the target ID in children
          const result:any = findObjectById(data[i].children, targetId);
          if (result) {
            return result; // Return the found object if any
          }
        }
      }
      // If the object is not found, return null
      return null;
    }
    const findViaAPI = (id: string) => {
      return testData.find(e => e?.id === id)?.children || [];
    }

    const abbreviating = (name: string) => {
      const names = ["Subsidiary", "Consumer", "SCF"]
      let newWords: any = []
      const words = name.split(" ")
      words.forEach(e => {
          return e === "PT" ? newWords.push("PT. ") : names.includes(e) ? newWords.push(e) :  newWords.push(e.charAt(0))
      })
      return newWords.join("")
    }
    series.nodes.template.events.on("dataitemchanged", (e:any) => {
      var dataItem = e.target.dataItem
      var name = dataItem.get("category");
      dataItem.set("category", abbreviating(name))
    })

    let canvas =  document.querySelector("canvas")
    canvas?.setAttribute("width", `${window.innerWidth}`)
    canvas?.setAttribute("height", `${window.innerHeight}`)
    canvas?.removeAttribute("style")
    console.log(canvas)

    series.nodes.template.events.on("click", (e:any) => {
      var dataItem = e.target.dataItem;
      console.log(dataItem.get("category"))
        var id = dataItem.get("id");
        var isCollapsed = dataItem.get("customValue")
        // var newChild = findViaAPI(id);
        var newChild = findObjectById(database, id)?.children || []
        console.log("before clicked",findObjectById(database, id), isCollapsed)
        var findNodeData: any = findNode(id)?.dataItem?.dataContext
        const findNodeDataItem: any = findNode(id)?.dataItem
        if(!findNodeData.children) {
          series.addChildData(dataItem, [
            ...newChild
          ]);
        } else {
          !isCollapsed ? series.disableDataItem(findNodeDataItem) : series.enableDataItem(findNodeDataItem);
        }
        dataItem.set("customValue", !isCollapsed)
        console.log(dataItem?.dataContext)
    });
    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);

    return () => {
      root.dispose();
    };
  }, [])
  return (
    <div>
      <div id="chartdiv" style={{ width: "100vv", height: "100vh" }}></div>
    </div>
  );
}

export default App;
