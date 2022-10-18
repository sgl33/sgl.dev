/* Name: Seung-Gu Lee
   Date: 10/27 ~ 12/1 (Semester 1 Interdisciplinary Project)
   Description: Adds vectors and calculates the resultant, final direction/angle, average, X and Y components
   
   < Pseudocode >
 
   
   main method
   {
      // Welcome message
      print("Welcome");
      
      // Main loop
      do{
         // reset variables
         reset counter, totalComponent
         
         // asks/assigns the input
         Method.askUserUnit
            print("Enter a unit");
            vectorUnit = nextLine
         
         // loop of vector input
         do{
            // receives magnitude of a vector
            Method.askUserMagnitude
               print("Enter the magnitude of vector #"+counter);
               vectorMagnitude = nextDouble
               
            // receives direction/angle and seperates the vector into X/Y components
            Method.calculationProcess
               do{
                  print("Enter the direction");
                  Direction = nextInt
                  wrongInput = false
                  
                  // calculation
                  if(Direction==1 which is north) newYcomp=vectorMagnitude
                  else if(Direction==2 which is south) newYcomp=-1*vectorMagnitude
                  else if(Direction==3 which is east) newXcomp=vectorMagnitude
                  else if(Direction==4 which is west) newXcomp=-1*vectorMagnitude
                  else if(Direction==5 which is northeast) {
                     vectorAngle = Method.askUserAngle
                        print("Enter angle")
                        vectorAngleDegrees = nextDouble
                        vectorAngleDegrees > vectorAngleRadians (convert)
                        return (double vectorAngleRadians)
                     newXcomp = vectorMagnitude * cos(vectorAngle)
                     newYcomp = vectorMagnitude * sin(vectorAngle)
                     }
                  else if(Direction==6 which is northwest) {
                     vectorAngle = Method.askUserAngle
                        print("Enter angle")
                        vectorAngleDegrees = nextDouble
                        vectorAngleDegrees > vectorAngleRadians (convert)
                        return (double vectorAngleRadians)
                     newXcomp = vectorMagnitude * cos(vectorAngle) * -1
                     newYcomp = vectorMagnitude * sin(vectorAngle)
                     }
                  else if(Direction==7 which is southwest) {
                     vectorAngle = Method.askUserAngle
                        print("Enter angle")
                        vectorAngleDegrees = nextDouble
                        vectorAngleDegrees > vectorAngleRadians (convert)
                        return (double vectorAngleRadians)
                     newXcomp = vectorMagnitude * cos(vectorAngle) * -1
                     newYcomp = vectorMagnitude * sin(vectorAngle) * -1
                     }
                  else if(Direction==8 which is southeast) {
                     vectorAngle = Method.askUserAngle
                        print("Enter angle")
                        vectorAngleDegrees = nextDouble
                        vectorAngleDegrees > vectorAngleRadians (convert)
                        return (double vectorAngleRadians)
                     newXcomp = vectorMagnitude * cos(vectorAngle)
                     newYcomp = vectorMagnitude * sin(vectorAngle) * -1
                     }
                  else {
                     print("Error")
                     wrongInput = true;
                     }
                                          
                  }while(wrongInput==true)
               
            // assigning variables
            newComponent[0], newComponent[1] = newXcomp, newYcomp 
            
            // adds newest vector to total
            Method.addToTotal
               totalComponent[0, 1] += newComponent[0, 1]
               
            // keeping track of counter
            counter++
            
            // ask repeat vector adding process
            Method.askRepeat
               print("Repeat?")
               repeatInput = nextLine
               
               do{
                  wrongInput=false
                  if(repeatInput.ignoreCase=="yes")
                     repeatInputBoolean=true;
                  else if(repeatInput.ignoreCase=="no")
                     repeatInputBoolean=false;
                  else
                     print("Error") 
                     wrongInput=true
                  } while(wrongInput==true)
                  
            } while(repeatInputBoolean==true)
         
         // calculates the resultant
         Method.calculateResultant
            finalResultant = Math.sqrt(totalX^2+totalY^2)
            
         // calculates the final angle
         Method.calculateFinalAngle
            finalAngleRadians = tan^-1(totalYcomp / totalXcomp)
            finalAngleRadians > finalAngleDegrees (convert)
            adjust angle
               if negative, change to positive
               if greater than or equal to 90, minus 90
            
         // calculates the final direction
         Method.calculateFinalDirection
            if(x>0 & y>0) finalDirection = NE
            else if(x<0 & y>0) finalDirection = NW
            else if(x<0 & y<0) finalDirection = SW
            else if(x>0 & y<0) finalDirection = SE
            else if(x>0 & y=0) finalDirection = E
            else if(x<0 & y=0) finalDirection = W
            else if(x=0 & y>0) finalDirection = N
            else if(x=0 & y<0) finalDirection = S
            else if(x=0 & y=0) finalDirection = N/A
         
         // prints data of total of vectors
         print(finalResultant, finalAngle, finalDirection, totalXcomp, totalYcomp with vectorUnit)
         
         // calculates average
         Method.calculateAverage
            print("Print average?")
            responseAverage = nextLine
            if(responseAverage.ignoreCase=="yes")
               averageX = totalXcomp / counter
               averageY = totalYcomp / counter
               resultantAverage = finalResultant / counter
               print(averageX, averageY, resultantAverage)
         
         // printing table of X/Y components
         Method.printAllEntries
            print("Print all entries seperated to X and Y comps?")
            responseEntries = nextLine
            if(responseEntries.ignoreCase=="yes")
               for(int i, when i < counter, i++) {
                  print((i+1), xComp[i], yComp[i]) but round it to 2 decimals }
          
         // asks user if repeat everything or not
         Method.askRepeatEverything
            do{
               wrongInput = false;
               print("repeat everything?")
               repeatInput = nextLine
               
               if(repeatInput.ignoreCase=="yes")
                  doItAgain = true
               else if(repeatInput.ignoreCase=="no")
                  doItAgain = false
               else 
                  print("Error")
                  wrongInput = true
               } while(wrongInput==true)
         
         } while (doItAgain)
         
      // Exit message
      print("bye!")
   }          
                  
   NOTICE FOR PSEUDOCODE
   - This pseudocode is to better visualize the algorithm
   - Variables/constants/strings/etc may not be declared nor initialized
   - Variables/constants/strings/etc name may change during the pseudocode (but it will be identifiable)
   - Variables/constants/strings/etc name may not be same to the actual code
   - Tasks will be done in the main method under Method.methodName
   - Code maybe modified (e.g. System.out.println to print)
   - Syntax rules are not constant (e.g. some loops may have {} but some may not)
   - For counter related variables, -1 or +1 can be done to make the things make sense but not shown in pseudocode
   - ONLY LOOK AT THE ALGORITHM!!!   
  */
   
package vectorcalculator;  

// Scanner import
import java.util.Scanner;

public class VectorCalculator
{
	public static void main(String[] args)
	{
		// Declaration
		Scanner keyboard = new Scanner(System.in);
		String vectorUnit;
		double vectorMagnitude;
		double[] vectorAverage = new double[2];
		int counter = 0;
		double[] newComponent = new double[2];
		double[] xComponent = new double[100];
		double[] yComponent = new double[100];
		double[] totalComponent = {0, 0};
		double[] averageComponent = new double[2];
		boolean doItAgain = true;
		String calculateAverageResponse;
		double vectorResultant;
		double vectorFinalAngle;
		String vectorFinalDirection;
		
		// Welcome message
		System.out.println("Welcome to Vector Calculator!");
		
		// Loop of Entire Process
		do{
			// Resets variables
			counter = 0;
			totalComponent[0] = 0;
			totalComponent[1] = 0;
			
			// Assigns a unit
			vectorUnit = VectorCalculator.askUserUnit();
			
			// Loop of Entering a Vector
			do{
				// Receives magnitude
				vectorMagnitude = VectorCalculator.askUserMagnitude((counter+1));
				
				// Receives direction input, seperates the vector to X and Y components
				newComponent = VectorCalculator.calculationProcess(vectorMagnitude);
				
				// Assignes the input value to another set of array
				xComponent[(counter)] = newComponent[0];
				yComponent[(counter)] = newComponent[1];
				
				// Adds the newly entered vector to total
				totalComponent = VectorCalculator.addToTotal(totalComponent, xComponent[(counter)], yComponent[(counter)]);
				
				// Keeps track of counter
				counter++;
				
				// If user wants, enter a new vector
				doItAgain = VectorCalculator.askRepeat();
			
				// If user replied "yes" in askRepeat method, loop will be repeated
			} while(doItAgain==true);
			
			// Calculate resultant, final angle and direction
			vectorResultant = VectorCalculator.calculateResultant(totalComponent[0], totalComponent[1]);
			vectorFinalAngle = VectorCalculator.calculateFinalAngle(totalComponent[0], totalComponent[1]);
			vectorFinalDirection = VectorCalculator.calculateFinalDirection(totalComponent[0], totalComponent[1]);
			
			// Prints the total value & number of vectors entered
			System.out.println("\nThe total of your vectors is:\nResultant: "+vectorResultant+" "+vectorUnit+"\nAngle: "+vectorFinalAngle+" degrees\nDirection: "+vectorFinalDirection+" \n[x] "+totalComponent[0]+" "+vectorUnit+"\n[y] "+totalComponent[1]+" "+vectorUnit+"\nYou have entered a total of "+counter+" vectors.\nPlease note that the numbers might have up to ±0.01% error due to radian ↔ degree conversion.\n");
			
			// If user wants, calculates average & all vectors divided into X/Y components
			VectorCalculator.calculateAverage(totalComponent[0], totalComponent[1], (counter+1), vectorUnit, vectorResultant);
			VectorCalculator.printAllEntries(xComponent, yComponent, totalComponent, averageComponent, counter);
		
			// If user wants, repeat the entire process
			doItAgain = VectorCalculator.askRepeatEverything();
			
			// If user replied "yes" in askRepeatEverything method, loop will be repeated
		  } while(doItAgain==true);
		
		  // Exit message
		  System.out.println("\nThank you!");
	}

		
	// Receives input: Unit of Vector
	public static String askUserUnit()
	{
		// Declaration part
		Scanner keyboard = new Scanner(System.in);
		String unitInput;
		
		// Receives unit
		System.out.print("What is the unit of the vectors you are adding?\n>> ");
		unitInput = keyboard.nextLine();
		
		// Return
		return unitInput;
	}
	
	
	// Receives input: Magnitude of Vector
	public static double askUserMagnitude(int pCounter)
	{
		// Declaration part
		Scanner keyboard = new Scanner(System.in);
		double magnitudeInput;
		
		// Receives magnitude
		System.out.print("\nPlease enter the magnitude of vector #"+pCounter+".\n>> ");
		magnitudeInput = keyboard.nextDouble();
		keyboard.nextLine();
		
		// Return
		return magnitudeInput;
	}
	
	
	// Receives input: Direction of Vector, Angle of Vector(if necessary), Calculates: Divides the vector into X and Y components
	public static double[] calculationProcess(double pMagnitudeInput)
	{
		// Declaration part
		Scanner keyboard = new Scanner(System.in);
		int directionInput;
		double[] calculatedComponent = new double[2];
		double vectorAngle;
		boolean wrongInput;
		
		// Receiving direction and/or angle
		do{
			// Receives direction
			System.out.println("\nEnter the direction of a vector.\n\n        1        \n        |        \n    6   |   5    \n        |        \n4------- -------3\n        |        \n    7   |   8    \n        |        \n        2        \n");
			System.out.print("[1] North / Positive vertical \n[2] South / Negative vertical \n[3] East / Positive horizontal\n[4] West / Negative horizontal\n[5] Northeast / The first quadrant\n[6] Northwest / The second quadrant\n[7] Southwest / The third quadrant \n[8] Southeast / The fourth quadrant\n(Enter the integer in the brackets; 1 ~ 8.)\n>> ");
			directionInput = keyboard.nextInt();
			
			// Depending on the direction, it asks the angle and/or divides it into X and Y components
			if(directionInput == 1) // North or Y+
			{
				calculatedComponent[1] = pMagnitudeInput;
				wrongInput = false;
			}
			else if(directionInput == 2) // South or Y-
			{
				calculatedComponent[1] = -1 * pMagnitudeInput;
				wrongInput = false;
			}
			else if(directionInput == 3) // East or X+
			{
				calculatedComponent[0] = pMagnitudeInput;
				wrongInput = false;
			}
			else if(directionInput == 4) // West or X-
			{
				calculatedComponent[0] = -1 * pMagnitudeInput;
				wrongInput = false;
			}
			else if(directionInput == 5) // NE or 1st quadrant
			{
				vectorAngle = VectorCalculator.askUserAngle();
				calculatedComponent[0] = Math.cos(vectorAngle) * pMagnitudeInput;
				calculatedComponent[1] = Math.sin(vectorAngle) * pMagnitudeInput;
				wrongInput = false;
			}
			else if(directionInput == 6) // NW or 2nd quadrant
			{
				vectorAngle = VectorCalculator.askUserAngle();
				calculatedComponent[0] = -1 * Math.cos(vectorAngle) * pMagnitudeInput;
				calculatedComponent[1] = Math.sin(vectorAngle) * pMagnitudeInput;
				wrongInput = false;
			}
			else if(directionInput == 7) // SW or 3rd quadrant
			{
				vectorAngle = VectorCalculator.askUserAngle();
				calculatedComponent[0] = -1 * Math.cos(vectorAngle) * pMagnitudeInput;
				calculatedComponent[1] = -1 * Math.sin(vectorAngle) * pMagnitudeInput;
				wrongInput = false;
			}
			else if(directionInput == 8) // SE or 4th quadrant
			{
				vectorAngle = VectorCalculator.askUserAngle();
				calculatedComponent[0] = Math.cos(vectorAngle) * pMagnitudeInput;
				calculatedComponent[1] = -1 * Math.sin(vectorAngle) * pMagnitudeInput;
				wrongInput = false;
			}
			else // if wrong input was entered, repeat
			{
				System.out.println("\nError: Please enter an integer between 1 ~ 8.");
				wrongInput = true;
			}
		} while(wrongInput == true);
			
		// Return
		return calculatedComponent;
	}

	
	// Receives angle of vectors and converts degrees input to radians (because Java Math methods are in radians)
	public static double askUserAngle()
	{
		// Declaration
		Scanner keyboard = new Scanner(System.in);
		double angleInputRadians;
		double angleInputDegrees;
		
		// Receives angle
		System.out.print("\nPlease enter the angle of vector above or below the horizontal.\n- For choices 5 and 6, enter the angle above the horizontal.\n- For choices 7 and 8, enter the angle below the horizontal.\n- The angle must be in degrees.\n>> ");
		angleInputDegrees = keyboard.nextDouble();
		keyboard.nextLine();
		
		// Converts to radians
		angleInputRadians = Math.toRadians(angleInputDegrees);
		
		// Return
		return angleInputRadians;
	}
	
	
	// Calculates: Adds newly entered vector to total
	public static double[] addToTotal(double[] pTotalComponent, double xNew, double yNew)
	{
		// Add newly entered vector to total
		pTotalComponent[0] += xNew;
		pTotalComponent[1] += yNew;
		
		// Return
		return pTotalComponent;
	}
	
	
	// Receives input: If user wants to add another vector or not
	public static boolean askRepeat()
	{
		// Declaration
		Scanner keyboard = new Scanner(System.in);
		boolean repeatInputBoolean = false;
		String repeatInput;
		boolean wrongInput = false;
		
		// Loop to ask user to add another vector or not
		do {
			// Receives user reply
			System.out.print("\nWould you like to enter another vector(s)?\nEnter yes for YES, no for NO\n(You may not enter more than 100 vectors.)\n>> ");
			repeatInput = keyboard.nextLine();
			
			if(repeatInput.equalsIgnoreCase("yes")) // "yes": repeat the vector-entering loop
			{
				repeatInputBoolean = true;
				wrongInput = false;
			}
			else if(repeatInput.equalsIgnoreCase("no")) // "no": end the vector-entering loop
			{
				repeatInputBoolean = false;
				wrongInput = false;
			}
			else // anything else: repeat the loop, ask user again
			{
				System.out.println("\nError: Please enter either \"yes\", \"no\".");
				wrongInput = true;
			}
		} while(wrongInput);
		
		// Return
		return repeatInputBoolean;
	}
	
	// Calculates: resultant using Pythagorean Theorem
	public static double calculateResultant(double pTotalX, double pTotalY)
	{
		// Declaration
		double finalResultant;
		
		// Calculates resultant
		finalResultant = Math.sqrt(((pTotalX * pTotalX)+(pTotalY * pTotalY)));
		
		// Return
		return finalResultant;
	}
	
	// Calculates: final angle using trigonometric equations
	public static double calculateFinalAngle(double pTotalX, double pTotalY)
	{
		// Declaration
		double finalAngleRadians, finalAngleDegrees;
		
		// Calculates final angle
		finalAngleRadians = Math.atan((pTotalY / pTotalX));
		finalAngleDegrees = Math.toDegrees(finalAngleRadians);
		
		// Angle modification for angle to make sense
		if(finalAngleDegrees < 0)
		{
			finalAngleDegrees = finalAngleDegrees * -1;
		}
		if(finalAngleDegrees>=90)
		{
			finalAngleDegrees = finalAngleDegrees - 90;
		}
	
		// Return
		return finalAngleDegrees;
	}
	
	// Calculates: final direction using signs of X and Y components
	public static String calculateFinalDirection(double pTotalX, double pTotalY)
	{
		// Declaration
		String finalDirection = ""; 
		
	    // Final direction is calculated depending on the signs of X/Y components
		if(pTotalX > 0 && pTotalY > 0)
		{
			finalDirection = "1st quadrant (Northeast) above horizontal axis";
		}
		else if(pTotalX < 0 && pTotalY > 0)
		{
			finalDirection = "2nd quadrant (Northwest) above horizontal axis";
		}
		else if(pTotalX < 0 && pTotalY < 0)
		{
			finalDirection = "3rd quadrant (Southwest) below horizontal axis";
		}
		else if(pTotalX > 0 && pTotalY < 0)
		{
			finalDirection = "4th quadrant (Southeast) below horizontal axis";
		}
		else if(pTotalX > 0 && pTotalY == 0)
		{
			finalDirection = "Positive horizontal (East)";
		}
		else if(pTotalX < 0 && pTotalY == 0)
		{
			finalDirection = "Negative horizontal (West)";
		}
		else if(pTotalX == 0 && pTotalY > 0)
		{
			finalDirection = "Positive vertical (North)";
		}
		else if(pTotalX == 0 && pTotalY < 0)
		{
			finalDirection = "Negative vertical (South)";
		}
		else if(pTotalX == 0 && pTotalY == 0)
		{
			finalDirection = "N/A";
		}
		
		// Return
		return finalDirection;
	}
	
	// Receives input: If user wants to see the average or not, Calculates: The average of vectors & Displays: The average of vectors
	public static void calculateAverage(double pXComponent, double pYComponent, int pCounter, String pUnit, double pResultant)
	{
		// Declaration
		double[] averageArray = new double[2];
		double resultantAverage;
		String calculateAverageResponse;
		Scanner keyboard = new Scanner(System.in);
		
		// Asks the user to print the average
		System.out.print("\nDo you want to see the average of the vectors?\nEnter \"Yes\" to calculate the average, and anything else to skip average calculation.\n>> ");
		calculateAverageResponse = keyboard.nextLine();
		
		// If user replies "yes", calculates and prints average
		if(calculateAverageResponse.equalsIgnoreCase("yes"))
		{
			averageArray[0] = pXComponent / (pCounter-1);
			averageArray[1] = pYComponent / (pCounter-1);
			resultantAverage = pResultant / (pCounter-1);
			System.out.println("The average of your vectors is:\n[x] "+averageArray[0]+" "+pUnit+"\n[y] "+averageArray[1]+" "+pUnit+"\nResultant: "+resultantAverage);
		}
	}
	
	
	// Receives input: If users want to see all entries divided to X and Y components or not, Displays: All vectors divided into X and Y components
	public static void printAllEntries(double[] pXComponent, double[] pYComponent, double[] pTotalComponent, double[] pAverageComponent, int pCounter)
	{
		// Declaration
		Scanner keyboard = new Scanner(System.in);
		String tableResponse;
		
		// Asks user to print the table of X/Y components
		System.out.print("\nDo you want to see the table of the X and Y components?\nEnter \"Yes\" to see it, and anything else to skip.\n>> ");
		tableResponse = keyboard.nextLine();
		
		// If user replies "yes", print all X/Y components using loop
		if(tableResponse.equalsIgnoreCase("yes"))
		{
			System.out.println("\nThese are the vectors you have entered, seperated into X and Y components.\n");
	
			for(int i = 0; i < pCounter; i++)
			{
				System.out.println("#"+(i+1)+" | [x] "+pXComponent[i]+" | [y] "+pYComponent[i]); 
			}
		}
	}
	
	
	// Receives input: If users want to repeat the entire process or quit
	public static boolean askRepeatEverything()
	{
		// Declaration
		Scanner keyboard = new Scanner(System.in);
		boolean repeatInputBoolean = false;
		String repeatInput;
		boolean wrongInput = false;
		
		// Loop: asks the user to repeat the entire process or not
		do {
			// reset variables, ask user
			wrongInput = false;
			System.out.print("\nWould you like to repeat the whole process again?\nEnter yes for YES, no for NO\n>> ");
			repeatInput = keyboard.nextLine();
			
			// Depending on the reply, value of variable(s) is changed
			if(repeatInput.equalsIgnoreCase("yes"))
			{
				repeatInputBoolean = true;
			}
			else if(repeatInput.equalsIgnoreCase("no"))
			{
				repeatInputBoolean = false;
			}
			else
			{
				System.out.println("Error: Please enter either \"yes\", \"no\".");
				wrongInput = true;
			}
		} while(wrongInput);
		
		// Return
		return repeatInputBoolean;
	}
}
