#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import osimport webapp2
import jinja2


jinjaEnv = jinja2.Environment(autoescape=True,
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__),
        'templates')))

class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = jinjaEnv.get_template('pythagorasIn.html')
        self.response.write(template.render())

class TriplesHandler(webapp2.RequestHandler):
    def get(self):
        x = self.request.get('maxValue')
        x = int(float(x))
        triples = []

        for a in range(1, x):
            for b in range(a, x):
                for c in range(b, x):
                    if a**2 + b**2 == c**2:
                        triples.append((a, b, c))
        
        numResults = len(triples)

        template = jinjaEnv.get_template('pythagorasOut.html')
        self.response.write(template.render({'maxValue': x,'numResults': numResults, 'triples': triples}))

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/results', TriplesHandler)
], debug=True)
