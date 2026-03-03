/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Scene1_Intro, Scene2_Selection } from "./components/Scenes";
import { Scene3_Transition } from "./components/Transition";
import { Learning_Keywords } from "./components/Learning";
import { Simulation_Exam } from "./components/Simulation";
import { Feedback_Result } from "./components/Feedback";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scene1_Intro />} />
        <Route path="/select" element={<Scene2_Selection />} />
        <Route path="/transition" element={<Scene3_Transition />} />
        <Route path="/learning" element={<Learning_Keywords />} />
        <Route path="/exam" element={<Simulation_Exam />} />
        <Route path="/feedback" element={<Feedback_Result />} />
      </Routes>
    </BrowserRouter>
  );
}
