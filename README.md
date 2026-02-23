##1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
 ans:
  1. When i need to specific one element from DOM, then i use getElementById.
  2. When I want the similar elements, then I set same className those element, and by using getElementsByClassName, I can get all elements.
  3. querySelector can take the first element from dom by className/tag name/id name. Before class used dott(.), id hash(#) and for tag (Only tag name) into inverted comma, like css style.
  4. querySelectorAll take the all elements from dom by className/tag name/id name.
     
##2. How do you create and insert a new element into the DOM?
    ans: 
    1. document.cerateElement() For create new elemennt into the dom
    2. innerHTML/appendchild for insert a new element.
       
##3. What is Event Bubbling? And how does it work?
    ans:
    Event Bubbling is a way that's event propagate childNode to parentNode. First runs on that element, then its bubble up to his parent.
